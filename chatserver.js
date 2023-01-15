let connect_user =" ";
    exports.Chat=(socket)=>{
    console.log('you have successfully connected to the chat server')
    socket.on('new-user',username =>{
        connect_user = username;
         socket.broadcast.emit('connected-user',username);
        })
        socket.on('send-message',message =>{
        socket.broadcast.emit('chat-message',{message: message,user :connect_user});
        })

   socket.on('disconnect',()=>{
    socket.broadcast.emit('user-disconnected',connect_user);
    connect_user = '';
   })

   socket.on('show-typing',function(show){
    console.log(show)
    socket.broadcast.emit('show-type',show)
   })
}


