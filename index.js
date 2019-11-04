let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let channels = {};
let reverse_lookup = {};
io.on("connection", socket => {
    socket.on("disconnect", () => {
        if (!channels[reverse_lookup[socket.id]].socks) return;
        channels[reverse_lookup[socket.id]].socks.splice(channels[reverse_lookup[socket.id]].socks.indexOf(socket), 1);
        if(!channels[reverse_lookup[socket.id]].socks.length)
            delete channels[reverse_lookup[socket.id]];
        delete reverse_lookup[socket.id];
    })
    socket.on("create", ({ channelCode, name }) => {
        reverse_lookup[socket.id] = channelCode;
        console.log("channel", channelCode,socket.id);
        if (channels[channelCode] != undefined){
            socket.emit("info", {
                board: channels[channelCode].board,
                sign: 1,
                turn: channels[channelCode].turn
            })
            channels[channelCode].socks.push(socket);
        }
        else{
            socket.emit("info", {
                board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
                sign: 0,
                turn: 0
            });
            channels[channelCode] = {
                board: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]],
                turn: 0,
                socks:[socket]
            };
        }
    });
    socket.on("move", ({ board }) => {
        channels[reverse_lookup[socket.id]].board = board;
        channels[reverse_lookup[socket.id]].turn = channels[reverse_lookup[socket.id]].turn == 0 ? 1 : 0;
        channels[reverse_lookup[socket.id]].socks.forEach(element => {
            element.emit("change", {
                board,
                turn: channels[reverse_lookup[socket.id]].turn
            });
        });
    })
});

http.listen(8080);