import instance from "./instance";

export const fetchConversations = async (token) => {
  const { data } = await instance.get("/messages/conversations", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const fetchMessages = async (conversationId, token) => {
  const { data } = await instance.get(
    `/messages/conversations/${conversationId}/messages`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};

export const createConversation = async (participantId, token) => {
  const { data } = await instance.post(
    "/messages/conversations",
    { participantId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
};
