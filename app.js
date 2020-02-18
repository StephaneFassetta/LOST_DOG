const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uuidv1 = require('uuid/v1');
var cookie = require('cookie');
const Swal = require('sweetalert2');
var players = {};
var rooms = {};


//__ Library
var app = require('./bin/www').app;
var io = require('./bin/www').io;
var socketTools = require('./classes/socketTools')(io);
var Player = require('./classes/Player.js');

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

    socket.on('joinRoom', function (dataRoom)
    {
        socket.join(dataRoom.nameRoom);
        console.log(dataRoom.nameRoom);
        let newPlayer = new Player(dataRoom.pseudo, 'test', socket.id, (dataRoom.admin) == '1' ? true : false);
        players[dataRoom.nameRoom] = newPlayer;
        io.sockets.in(dataRoom.nameRoom).emit('joinRoom', { player : newPlayer, hasBeenCreate : (dataRoom.hasBeenCreate) == '1' ? true : false});
        io.sockets.in(dataRoom.nameRoom).emit('refreshPlayersList', { players : players});
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
