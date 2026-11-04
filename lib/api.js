const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("shohojog_token");
}

export function saveToken(token) {
  if (typeof window !== "undefined" && token) {
    localStorage.setItem("shohojog_token", token);
  }
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("shohojog_token");
  }
}

// Server theke JWT nao - login er por call korba
export async function fetchServerToken(user) {
  if (!user?.email) return null;
  try {
    const res = await fetch(`${API_URL}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        image: user.image || "",
      }),
    });
    const data = await res.json();
    if (data.token) {
      saveToken(data.token);
      return data.token;
    }
    return null;
  } catch (err) {
    console.log("Token fetch error", err);
    return null;
  }
}

async function apiFetch(path, options = {}) {
  const token = getStoredToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Kichu ekta vul hoise");
  return data;
}

export async function getEvents({ search = "", type = "" } = {}) {
  const q = new URLSearchParams();
  if (search) q.set("search", search);
  if (type) q.set("type", type);
  const str = q.toString();
  const res = await fetch(`${API_URL}/api/events${str ? `?${str}` : ""}`);
  return res.json();
}

export async function getRecentEvents() {
  const res = await fetch(`${API_URL}/api/events/recent`);
  return res.json();
}

export async function getEventById(id) {
  const res = await fetch(`${API_URL}/api/events/${id}`);
  return res.json();
}

export async function getJoinedCount(eventId) {
  const res = await fetch(`${API_URL}/api/joined/count/${eventId}`);
  return res.json();
}

export async function createEvent(data) {
  return apiFetch("/api/events", { method: "POST", body: JSON.stringify(data) });
}

export async function updateEvent(id, data) {
  return apiFetch(`/api/events/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export async function deleteEvent(id) {
  return apiFetch(`/api/events/${id}`, { method: "DELETE" });
}

export async function getMyEvents(email) {
  const res = await fetch(`${API_URL}/api/events/my/${email}`);
  return res.json();
}

export async function joinEvent(eventId, user) {
  return apiFetch("/api/joined", {
    method: "POST",
    body: JSON.stringify({ eventId, userEmail: user.email, userName: user.name, userImage: user.image || "" }),
  });
}

export async function getJoinedEvents(email) {
  const res = await fetch(`${API_URL}/api/joined/${email}`);
  return res.json();
}

export async function leaveEvent(eventId) {
  return apiFetch(`/api/joined/${eventId}`, { method: "DELETE" });
}
