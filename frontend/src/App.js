import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";

function App() {
  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/projects" element={<ProjectsPage />} />

        <Route path="/tasks/:projectId" element={<TasksPage />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;