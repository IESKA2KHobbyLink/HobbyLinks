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
        <div className='w-96 h-64 fixed'>
            <p className="text-5xl text-center">カテゴリー</p>
            <ul className="h-full text-xl w-auto">
                {/* カテゴリーをforeachみたいなので回す */}
                {category.map((c) => (<li>{c.category_name}</li>))}
            </ul>
        </div>
    );
}

export default CategoryViews;
