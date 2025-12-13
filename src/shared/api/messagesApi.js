import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchConversations = async (token) => {
  const { data } = await api.get("/messages/conversations", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchMessages = async (conversationId, token) => {
  const { data } = await api.get(
    `/messages/conversations/${conversationId}/messages`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
