import Banner from "@/components/Home/Banner";
import Featured from "@/components/Home/Featured";
import FeaturedSkeleton from "@/components/Skeletons/FeaturedSkeleton";

import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex flex-col md_lg:grid md:grid-cols-2 gap-10 mt-2 mx-auto p-3">
      <Banner className="col-span-2" />
      <Suspense fallback={<FeaturedSkeleton featuredDataType="product" />}>
        <Featured featuredDataType="product" />
      </Suspense>
      <Suspense fallback={<FeaturedSkeleton featuredDataType="seller" />}>
        <Featured featuredDataType="seller" />
      </Suspense>
    </div>
  );
}
