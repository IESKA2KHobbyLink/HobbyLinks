import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import Listview from "../components/Listview";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainPage() {
  const [showList, setShowList] = useState("group");
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='max-w-4xl mx-auto grid grid-cols-1'>
        <div className=''>
          <Searchbar setShowList={setShowList} showList={showList} />
          <Listview showList={showList} />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
