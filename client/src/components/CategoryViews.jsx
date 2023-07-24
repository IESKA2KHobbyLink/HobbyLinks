import React, { useEffect, useState } from "react";
import axios from "axios";

function CategoryViews() {
  const [category, Setcategory] = useState([]);
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
    // 自分を実行
    fetchCategoryData();
  }, []);

  return (
    <div className="w-96 h-64  border rounded-xl my-5 ">
      <p className="text-2xl text-center font-bold">カテゴリー</p>
      <div className="flex flex-wrap gap-2 px-4 py-2">
        {category.map((c) => (
          <Category_Item
            category_Name={c.category_name}
            category_Id={c.category_id}
          />
        ))}
      </div>
    </div>
  );
}

function Category_Item({ category_Name, category_Id }) {
  return (
    <div className="border-2 rounded-lg px-4 py-2 hover:bg-purple-200 hover:cursor-pointer font-semibold ">
      {category_Name}
    </div>
  );
}

export default CategoryViews;
