const API_URL = "http://127.0.0.1:5000";

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return res.json();
};

export const registerUser = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  return res.json();
};

export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return res.json();
};

export const createProject = async (name, description) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ name, description })
  });

  return res.json();
};

export const getTasks = async (projectId) => {
  const res = await fetch(`${API_URL}/task/project/${projectId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });

  return res.json();
};

export const createTask = async (projectId, title, description) => {

  const res = await fetch(`${API_URL}/task/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({
      project_id: projectId,
      title: title,
      description: description
    })
  });

  return res.json();
};

export const updateTask = async (taskId, data) => {

  const res = await fetch(`${API_URL}/task/${taskId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
};