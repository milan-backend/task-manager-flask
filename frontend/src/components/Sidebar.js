import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed">
      <h1 className="text-2xl font-bold mb-10">Task Manager</h1>

      <div className="flex flex-col gap-4">
        <Link to="/projects" className="hover:text-blue-400">
          Projects
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="text-red-400 text-left"
        >
          Logout
        </button>
      </div>
    </div>
  );
}