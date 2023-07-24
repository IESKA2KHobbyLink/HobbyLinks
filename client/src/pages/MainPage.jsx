import React, { useState } from "react";
import Listview from "../components/Listview";
import CategoryViews from "../components/CategoryViews";
import Map from "../components/Map";

function MainPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex justify-center ">
        <div className="max-w-4xl px-5">
          <Listview />
        </div>
        <div className="">
          <Map></Map>
          <CategoryViews></CategoryViews>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
