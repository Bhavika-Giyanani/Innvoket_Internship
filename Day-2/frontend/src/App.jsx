import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UsersPage from "./pages/UsersPage";
import TasksPage from "./pages/TasksPage";

const App = () => {
  return (
    <div className="cont">
      <Router>
        <Header />
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;