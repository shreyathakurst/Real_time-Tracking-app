const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);  

// Set views directory and view engine
app.set("views", path.join(__dirname, "views"));  // Add this line
app.set("view engine", "ejs");

// Correct static files middleware
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    socket.on("send-location", function(data){
        io.emit("recieve-location", {id: socket.id, ...data});
    })
    socket.on("disconnect", function(id){
        io.emit("user-disconnected", socket.id);
    });
})

app.get("/", (req, res) => {
   res.render("index");
})

server.listen(3000, () => {  // Changed from app.listen to server.listen
    console.log("Server running on port 3000");
});