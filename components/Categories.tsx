"use client";

import React from "react";
import { categoryFilters } from "@/constant"; 

type CategoriesProps = {
  onCategorySelect: (category: string | null) => void;
};

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-auto">
        {categoryFilters.map((filter: string) => (
          <button
            key={filter}
            type="button"
            onClick={() => onCategorySelect(filter === "View All" ? null : filter)}
            className="px-4 py-3 rounded-lg capitalize whitespace-nowrap"
          >
            {filter}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
