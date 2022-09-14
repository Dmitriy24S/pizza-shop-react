import React from "react";

interface Props {
  categoryId: number;
  handleCategoryChange: (selectedCategoryId: number) => void;
}

const categories = ["All", "Meat", "Vegetarion", "Grill", "Spicy"];

const Categories = ({ categoryId, handleCategoryChange }: Props) => {
  return (
    <section className="categories">
      <ul>
        {categories.map((category, index) => (
          <li key={category}>
            <button
              className={categoryId === index ? "active" : ""}
              onClick={() => {
                handleCategoryChange(index);
              }}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
