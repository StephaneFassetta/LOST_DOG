const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uuidv1 = require('uuid/v1');
var cookie = require('cookie');
const Swal = require('sweetalert2');
var players = {};
var totalRooms = {};


//__ Library
var app = require('./bin/www').app;
var io = require('./bin/www').io;
var socketTools = require('./classes/socketTools')(io);
var Player = require('./classes/Player.js');
var Game = require('./classes/Game.js');

//__ Routing
const indexRouter = require('./routes/index');
const roomRouter = require('./routes/room/room.index');
const settingsRouter = require('./routes/settings/settings.index');

//__ Views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

//__ Use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', function(socket) {

    socket.on('joinRoom', function (dataRoom, callback)
    {
        socket.join(dataRoom.gameInfos.nameRoom);

        if (dataRoom.gameInfos.hasBeenCreate == '1') {
            totalRooms[dataRoom.gameInfos.name] = dataRoom.game;
            console.log('New game is created.');
            dataRoom.game.playerNumber++;
            callback();
        } else {
            let gameToJoin = totalRooms[dataRoom.gameInfos.name];

            if (gameToJoin) {
                gameToJoin.players.push(new Player(dataRoom.playerInfos.pseudo, 'test', socket.id, (dataRoom.playerInfos.admin) == '1' ? true : false));
                console.log('Player have join this room ' + dataRoom.playerInfos.pseudo);
            }
        }
    });

    socket.on('sendMessage', function (dataRoom)
    {
        io.sockets.to(dataRoom.nameRoom).emit('sendMessage', {pseudo : dataRoom.pseudo, message : dataRoom.message});
    });
});

// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});

app.use('/', indexRouter);
app.use('/room', roomRouter);
app.use('/settings', settingsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
