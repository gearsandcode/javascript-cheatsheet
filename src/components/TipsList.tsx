import React from "react";
import { useTips } from "../context/TipsContext";
import TipCard from "./TipCard";

const TipsList: React.FC = () => {
  const { tips } = useTips();

  // Sort tips by their primary category (first in alphabetical order)
  const sortedTips = [...tips].sort((a, b) => {
    const categoryA = a.categories?.[0] || "";
    const categoryB = b.categories?.[0] || "";
    return categoryA.localeCompare(categoryB);
  });

  return (
    <div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4 3xl:columns-6 gap-2 space-y-2">
      {sortedTips.map((tip) => (
        <div key={tip.id} className="break-inside-avoid">
          <TipCard tip={tip} />
        </div>
      ))}
    </div>
  );
};

export default TipsList;
