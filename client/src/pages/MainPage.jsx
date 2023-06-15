import React, { useState } from "react";
import Searchbar from "../components/Searchbar";
import Listview from "../components/Listview";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function MainPage() {
  const [showList, setShowList] = useState("group");
  return (
    <div className=" min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto grid grid-cols-12">
        <div className="col-span-2 sticky top-0"></div>
        <div className="col-span-8">
          <Searchbar setShowList={setShowList} showList={showList} />
          <Listview showList={showList} />
        </div>
        <div className="col-span-2 px-4"></div>
      </div>
    </div>
  );
}

export default MainPage;
