import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import GroupPage from "./pages/GroupPage";
import EventPage from "./pages/EventPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/group/:groupId' element={<GroupPage />} />
        <Route path='/event/:eventId' element={<EventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
