import React from "react";
import ContentLoader from "react-content-loader";

const PizzaCardSkeleton = (props: any) => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={468}
      viewBox="0 0 250 468"
      backgroundColor="#e6e6e6"
      foregroundColor="#f2f2f2"
      {...props}
    >
      <rect x="0" y="400" rx="11" ry="11" width="101" height="27" />
      <rect x="0" y="270" rx="9" ry="9" width="250" height="23" />
      <rect x="0" y="312" rx="13" ry="13" width="250" height="66" />
      <rect x="168" y="393" rx="19" ry="19" width="74" height="35" />
      <rect x="156" y="395" rx="0" ry="0" width="0" height="2" />
      <circle cx="123" cy="123" r="123" />
    </ContentLoader>
  );
};

export default PizzaCardSkeleton;
