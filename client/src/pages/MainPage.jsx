import React, { useState } from "react";
import Listview from "../components/Listview";
import Map from "../components/Map";

function MainPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex justify-center">
        <div className="max-w-4xl ">
          <Listview />
        </div>
        <div>
          <Map></Map>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
