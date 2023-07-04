import React, { useState, useEffect, useContext } from "react";
import EventItem from "./EventItem";
import GroupItem from "./GroupItem";
import axios from "axios";
import Searchbar from "./Searchbar";
import { SearchContext } from "./SearchContext";

function Listview() {
  const [events, setEvents] = useState([]);
  const [groups, setGroups] = useState([]);

  const { searchValue } = useContext(SearchContext);

  const [showList, setShowList] = useState("group");
  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEventsData();
  }, []);

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/groups");
        setGroups(response.data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroupsData();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.event_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.group_name.toLowerCase().includes(searchValue.toLowerCase())
  );
  console.log("filtered groups", filteredGroups);
  return (
    <>
      <Searchbar setShowList={setShowList} showList={showList} />
      <div className=' max-w-4xl  mx-auto overflow-y-auto'>
        <h2>Search Results for: {searchValue}</h2>
        {showList === "event" ? eventlist({ filteredEvents }) : grouplist({ filteredGroups })}
      </div>
    </>
  );
}

function eventlist({ filteredEvents }) {
  return filteredEvents.map((e) => (
    <EventItem
      key={e.event_id}
      desc={e.desc}
      title={e.event_name}
      eventId={e.event_id}
      imgUrl={e.header_path}
      date={e.date}
      attendeeCount={e.attendeeCount}
      group_name={e.group_name}
      type={e.type}
    />
  ));
}

function grouplist({ filteredGroups }) {
  return filteredGroups.map((e) => (
    <GroupItem
      key={e.group_id}
      desc={e.desc}
      title={e.group_name}
      groupId={e.group_id}
      imgUrl={e.header_path}
      memberCount={e.memberCount}
      prefecture={e.prefecture}
    />
  ));
}

export default Listview;
