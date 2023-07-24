import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import CategoryContext from "../context/CategoryContext";

function CategoryViews() {
  const [category, Setcategory] = useState([]);
  const { selectedCategory, setSelectedCategory } = useContext(CategoryContext);

  useEffect(() => {
    // データベースからデータを取ってくるコード
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/category");
        Setcategory(response.data);
      } catch (error) {
        // エラーメッセージを出力
        console.error("Error fetching category:", error);
      }
    };
    // fetchCategoryDataを実行
    fetchCategoryData();
  }, []);

  const handleCategoryClick = (c) => {
    // console.log("clicked", c);
    setSelectedCategory((prevSelected) => {
      if (prevSelected.includes(c)) {
        return prevSelected.filter((category) => category !== c);
      } else {
        return [...prevSelected, c];
      }
    });
  };

  console.log("selectedCategory", selectedCategory);

  return (
    <div className="w-96 h-64  border rounded-xl my-5 ">
      <p className="text-2xl text-center font-bold">カテゴリー</p>
      <div className="flex flex-wrap gap-2 px-4 py-2">
        {category.map((c) => (
          <Category_Item
            key={c.category_id}
            category_Name={c.category_name}
            category_Id={c.category_id}
            isSelected={selectedCategory.includes(c.category_id)}
            onClick={() => handleCategoryClick(c.category_id)}
          />
        ))}
      </div>
    </div>
  );
}

function Category_Item({ category_Name, onClick, isSelected }) {
  const itemClass = isSelected
    ? "border-2 rounded-lg px-4 py-2 bg-purple-600 font-semibold hover:cursor-pointer text-white "
    : "border-2 rounded-lg px-4 py-2 hover:bg-purple-200 hover:cursor-pointer font-semibold";

  return (
    <div className={itemClass} onClick={onClick}>
      {category_Name}
    </div>
  );
}

export default CategoryViews;
