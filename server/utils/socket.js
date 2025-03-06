const {Server}=require('socket.io')

const socketIO=(server)=>{
    const io = new Server(server, {
        cors: {
          origin: "http://localhost:5173",
          methods: ["GET", "POST"],
          credentials: true,
        },
      });
      

    io.on("connection",(socket)=>{
        console.log(`User Connected=> ${socket.id}`)

        socket.on("join-meeting",({meetingId, userId})=>{
            console.log(`User ${userId} Joined meeting ${meetingId}`)
            socket.join(meetingId);
            io.to(meetingId).emit("user-joined",{userId})
        });

        socket.on("send-message",({meetingId,message})=>{
            io.to(meetingId).emit("receive-message",{message});
        })

        socket.on("disconnect",()=>{
            console.log(`User Disconnected => ${socket.id}`)
        })
    })
}

module.exports=socketIO;