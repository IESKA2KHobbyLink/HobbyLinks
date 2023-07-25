import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GroupPage from "./pages/GroupPage";
import EventPage from "./pages/EventPage";
import CreateEventPage from "./pages/CreateEventPage";
import CreateGroupPage from "./pages/CreateGroupPage";
import Header from "./components/Header";
import UserProfile from "./pages/UserProfile";
import { SearchProvider } from "./context/SearchContext";
import { UserDetailsProvider } from "./context/UserDetailsContext";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <BrowserRouter>
      <UserDetailsProvider>
        <SearchProvider>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/group/:groupId" element={<GroupPage />} />
            <Route path="/event/:eventId" element={<EventPage />} />
            <Route path="/createEvent" element={<CreateEventPage />} />
            <Route path="/createGroup" element={<CreateGroupPage />} />
            <Route path="/UserProfile/:userID" element={<UserProfile />} />
            <Route path="/group/:groupId/Chat" element={<ChatPage />} />
          </Routes>
        </SearchProvider>
      </UserDetailsProvider>
    </BrowserRouter>
  );
}

export default App;
