import React, { useState, useEffect, useContext } from "react";
import EventItem from "./EventItem";
import GroupItem from "./GroupItem";
import axios from "axios";
import Searchbar from "./Searchbar";
import { SearchContext } from "../context/SearchContext";
import CategoryContext from "../context/CategoryContext";

function Listview() {
  // groupsをsetGroupsという値を変えれる関数で定義する
  const [groups, setGroups] = useState([]);
  const [events, setEvents] = useState([]);
  const { selectedCategory } = useContext(CategoryContext);
  console.log("selectedCategory", selectedCategory);
  // serchContextを使うためのコード
  // 分割代入
  const { searchValue } = useContext(SearchContext);

  // showListの値を更新するためにsetShowListがある？groupは初期値？
  const [showList, setShowList] = useState("group");
  // useEffect関数：effectは副作用という意味を持つ
  // 副作用フックと言い、第２引数によりrender(更新)時のみに実行するようになる
  // グループを出入りするときの処理
  useEffect(() => {
    // データベースからデータを取ってくるコード
    const fetchEventsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        setEvents(response.data);
      } catch (error) {
        // エラーメッセージを出力
        console.error("Error fetching events:", error);
      }
    };
    // 自分を実行
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

  // eventsという配列を回す,帰ってくる値は条件一致の配列がまとまって帰ってくる
  // foreachみたいな機能

  const filteredEvents = events.filter((event) => {
    const isNameMatched = event.event_name.toLowerCase().includes(searchValue.toLowerCase().trim());
    const isPrefectureMatched = event.prefecture
      .toLowerCase()
      .includes(searchValue.toLowerCase().trim());
    const isCategoryMatched =
      selectedCategory.length === 0 || selectedCategory.includes(event.category_id);

    // Return true if either name, prefecture, or category matches (or no category is selected)
    return (isNameMatched || isPrefectureMatched) && isCategoryMatched;
  });

  const filteredGroups = groups.filter((group) => {
    const isNameMatched = group.group_name.toLowerCase().includes(searchValue.toLowerCase().trim());
    const isPrefectureMatched = group.prefecture
      .toLowerCase()
      .includes(searchValue.toLowerCase().trim());
    const isCategoryMatched =
      selectedCategory.length === 0 || selectedCategory.includes(group.category_id);

    // Return true if either name or prefecture matches and either category matches (or no category is selected)
    return (isNameMatched || isPrefectureMatched) && isCategoryMatched;
  });
  console.log(filteredGroups);
  return (
    <>
      <Searchbar setShowList={setShowList} showList={showList} />
      <div className=' max-w-4xl mx-auto overflow-y-auto lg:w-[826px] '>
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
