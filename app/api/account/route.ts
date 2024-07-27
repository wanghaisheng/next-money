import { NextResponse, type NextRequest } from "next/server";

import { currentUser } from "@clerk/nextjs/server";
import { Ratelimit } from "@upstash/ratelimit";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { AccountHashids } from "@/db/dto/account.dto";
import { getUserCredit } from "@/db/queries/account";
import { userCredit } from "@/db/schema";
import { redis } from "@/lib/redis";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "5 s"),
    analytics: true,
  });
  const { success } = await ratelimit.limit(
    "account:info" + `_${req.ip ?? ""}`,
  );
  if (!success) {
    return new Response("Too Many Requests", {
      status: 429,
    });
  }

  const accountInfo = await getUserCredit(user.id);

  return NextResponse.json({
    ...accountInfo,
    id: AccountHashids.encode(accountInfo.id),
  });
}
