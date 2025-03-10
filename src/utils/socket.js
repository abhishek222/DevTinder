const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");

const getSecretRoomId = (currentUserId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([currentUserId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    socket.on("join_room", ({ currentUserId, targetUserId }) => {
      const room = getSecretRoomId(currentUserId, targetUserId);
      socket.join(room);
    });
    socket.on(
      "send_message",
      async ({ currentUserId, targetUserId, message, ...rest }) => {
        console.log(currentUserId, targetUserId, message);
        // save message to database
        try {
          const room = getSecretRoomId(currentUserId, targetUserId);
          const chat = await Chat.findOne({
            participants: { $all: [currentUserId, targetUserId] },
          });
          if (!chat) {
            const newChat = new Chat({
              participants: [currentUserId, targetUserId],
              messages: [{ sender: currentUserId, message }],
            });
            await newChat.save();
          } else {
            chat.messages.push({ sender: currentUserId, message });
            await chat.save();
          }
          io.to(room).emit("receive_message", {
            currentUserId,
            targetUserId,
            message,
            ...rest,
          });
        } catch (error) {
          console.log(error);
        }
      }
    );

    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
