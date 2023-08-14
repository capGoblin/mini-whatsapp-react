import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from "mongoose";
import { Server, Socket } from 'socket.io';
import Chat from './models/ChatModel';
const app = express();

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174']
    }
});

const users = new Map<string, string>();

app.use(bodyParser.json());

io.on('connection', (socket: Socket) => {
  console.log('user connected', socket.id);

  socket.on('join', (userId) => {
    users.set(userId, socket.id);
    console.log('User joined', userId);
    console.log(users);
    
  });

  socket.on('user_clicked_chat', (data) => {
    socket.broadcast.emit("user_clicked_chat", data);
  })

  socket.on('send_message', async (data) => {

    let senderSocketId = '';
    if (data.activeChatName) {
      for (const [userId, socketId] of users.entries()) {
        if (userId === data.activeChatName) {
          senderSocketId = socketId;
          break; 
        }
      }
    }

    socket.to(senderSocketId).emit("receive_message", data);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);

    users.forEach((value, key) => {
      if (value === socket.id) {
        users.delete(key)
      }
    })
  });
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/chat-app')
  .then(() => console.log(`Connected to mongoDB`))
  .catch((err) => console.log(err))


// Routes

app.post('/api/saveChatData', async (req, res) => {
  try {
    const { author, activeChatName, message, time } = req.body;
    const chatDocument = new Chat({
      author,
      activeChatName: activeChatName,
      message,
      time,
    });
    await chatDocument.save();
    console.log('Chat data saved to MongoDB');
    res.status(200).send('Chat data saved successfully');
  } catch (error) {
    console.error('Error saving chat data:', error);
    res.status(500).send('Error saving chat data');
  }
});

app.get('/api/:userName', async (req, res) => {
  const currentUserName = req.params.userName;

  try {
    const availableUsers = await Chat.find({ author: { $ne: currentUserName } });
    res.status(200).json(availableUsers);
  } catch (error) {
    console.error('Error fetching available users:', error);
    res.status(500).json({ error: 'Error fetching available users' });
  }
});