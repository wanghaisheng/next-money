"use client";

import { useTransition } from "react";

import { useAuth } from "@clerk/nextjs";

import { generateUserStripe } from "@/actions/generate-user-stripe";
import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { ChargeProductDto } from "@/db/schema";
import { SubscriptionPlan, UserSubscriptionPlan } from "@/types";

interface BillingFormButtonProps {
  offer: ChargeProductDto;
  btnText?: string;
}

export function BillingFormButton({
  offer,
  btnText = "Buy Plan",
}: BillingFormButtonProps) {
  let [isPending, startTransition] = useTransition();
  const { getToken } = useAuth();

  const stripeSessionAction = () =>
    startTransition(async () => {
      const data = await fetch(`/api/charge-order`, {
        method: "POST",
        body: JSON.stringify({
          amount: offer.amount,
          chanel: "Stripe",
          productId: offer.id,
          currency: offer.currency?.toUpperCase(),
        }),
        headers: { Authorization: `Bearer ${await getToken()}` },
      }).then((res) => res.json());
      window.location.href = data.url;
    });
  const userOffer = offer.amount === 1990;
  return (
    <Button
      variant={userOffer ? "default" : "outline"}
      rounded="full"
      className="w-full"
      disabled={isPending}
      onClick={stripeSessionAction}
    >
      {isPending ? (
        <>
          <Icons.spinner className="mr-2 size-4 animate-spin" /> Loading...
        </>
      ) : (
        <>{btnText}</>
      )}
    </Button>
  );
}
