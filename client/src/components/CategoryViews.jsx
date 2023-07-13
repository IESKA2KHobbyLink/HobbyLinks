import React from "react";

function CategoryViews() {
    return (
        <div className='w-96 h-64 fixed'>
            <p className="text-5xl text-center">カテゴリー</p>
            <ul className="h-full text-xl overflow-y-scroll w-auto">
                {/* カテゴリーをforeachみたいなので回す */}
                <li className="rounded bg-white border-b-4" >赤ちゃん本舗</li>

                <li></li>
                <li></li>
            </ul>
        </div>
    );
}

export default CategoryViews;
