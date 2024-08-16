import { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: "post",
        },
        {
          title: "Generate",
          href: "/dashboard/generate",
        },
        {
          title: "Gift Code",
          href: "/dashboard/giftcode",
          icon: "Gift",
        },
        {
          title: "Charts",
          href: "/dashboard/charts",
          icon: "lineChart",
        },
        {
          title: "Billing",
          href: "/dashboard/billing",
          icon: "billing",
        },
        {
          title: "Settings",
          href: "/dashboard/settings",
          icon: "settings",
        },
      ],
    },
  ],
};
