import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./Pages/UserList";
import WeatherPage from "./Pages/WeatherPage";


export default function App() {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/weather" element={<WeatherPage />} />
        </Routes>
      </Router>
    </>
  );
}
