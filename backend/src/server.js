const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: '*' }
});

// Middleware
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));

const videoRoutes = require('./routes/videoRoutes');
app.use('/api/videos', videoRoutes);

// Socket
io.on('connection', socket => {
  console.log('Socket connected:', socket.id);
});

// Make io accessible
app.set('io', io);

// Routes placeholder
app.get('/', (req, res) => {
  res.send('API running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const errorHandler = require("./middlewares/errorHandler");

app.use(errorHandler);
