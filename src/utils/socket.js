const socket = require("socket.io");
const crypto = require("crypto");

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
      console.log("room", room);
      socket.join(room);
    });
    socket.on("send_message", ({ currentUserId, targetUserId, message }) => {
      const room = getSecretRoomId(currentUserId, targetUserId);
      io.to(room).emit("receive_message", message);
    });

    socket.on("disconnect", () => {});
  });
};
module.exports = initializeSocket;
