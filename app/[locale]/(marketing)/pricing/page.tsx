import { currentUser } from "@clerk/nextjs/server";
import { unstable_setRequestLocale } from "next-intl/server";

import { PricingCards } from "@/components/pricing-cards";
import { PricingFaq } from "@/components/pricing-faq";
import { getChargeProduct } from "@/db/queries/charge-product";
import { getUserSubscriptionPlan } from "@/lib/subscription";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Pricing – SaaS Starter",
  description: "Explore our subscription plans.",
});

export const runtime = "edge";

type Props = {
  params: { locale: string };
};
export default async function PricingPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const { data: chargeProduct } = await getChargeProduct();

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards chargeProduct={chargeProduct}/>
      <hr className="container" />
      <PricingFaq />
    </div>
  );
}
