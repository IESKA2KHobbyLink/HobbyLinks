import React, { useState, useEffect } from "react";
import EventItem from "./EventItem";
import GroupItem from "./GroupItem";
import Events from "../data/Events";
import Group from "../data/Group";

function Listview({ showList }) {
  return (
    <div className=' max-w-7xl  mx-auto overflow-y-auto'>
      {showList === "event" ? eventlist() : grouplist()}
    </div>
  );
}

function eventlist() {
  return Events.map((e) => (
    <EventItem imgUrl={e.imgUrl} desc={e.desc} title={e.title} eventId={e.id} />
  ));
}

function grouplist() {
  return Group.map((e) => (
    <GroupItem imgUrl={e.imgUrl} desc={e.desc} title={e.title} groupId={e.id} />
  ));
}

export default Listview;
