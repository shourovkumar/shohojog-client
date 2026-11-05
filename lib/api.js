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

export async function fetchServerToken(user) {
  if (!user?.email) return null;
  try {
    const res = await fetch(`${API_URL}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user.email, name: user.name, image: user.image || "" }),
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
  if (!res.ok) throw new Error(data.message || "Something went wrong");
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

// Server fields: eventType, eventDate, creatorEmail, creatorName - map client fields to server fields
export async function createEvent(data) {
  const payload = {
    title: data.title,
    description: data.description,
    eventType: data.eventType || data.type,
    thumbnail: data.thumbnail,
    location: data.location,
    eventDate: data.eventDate || data.date,
    creatorEmail: data.creatorEmail || data.organizerEmail || "",
    creatorName: data.creatorName || data.organizerName || "",
    creatorPhoto: data.creatorPhoto || data.organizerPhoto || "",
  };
  return apiFetch("/api/events", { method: "POST", body: JSON.stringify(payload) });
}

export async function updateEvent(id, data) {
  const payload = {
    title: data.title,
    description: data.description,
    eventType: data.eventType || data.type,
    thumbnail: data.thumbnail,
    location: data.location,
    eventDate: data.eventDate || data.date,
  };
  return apiFetch(`/api/events/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export async function deleteEvent(id) {
  return apiFetch(`/api/events/${id}`, { method: "DELETE" });
}

// Protected - needs JWT token
export async function getMyEvents(email) {
  return apiFetch(`/api/events/my/${email}`);
}

export async function joinEvent(eventId, user) {
  return apiFetch("/api/joined", {
    method: "POST",
    body: JSON.stringify({ eventId, userEmail: user.email, userName: user.name, userPhoto: user.image || "" }),
  });
}

// Server returns event array for joined list, needs JWT token
export async function getJoinedEvents(email) {
  return apiFetch(`/api/joined/${email}`);
}

export async function leaveEvent(eventId) {
  return apiFetch(`/api/joined/${eventId}`, { method: "DELETE" });
}