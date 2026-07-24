"use client";

import dynamic from "next/dynamic";

export const HeroBackgroundLazy = dynamic(() => import("./HeroBackground"), {
  ssr: false,
});

export const GrowthChartLazy = dynamic(() => import("./GrowthChart"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full" aria-hidden="true" />,
});
