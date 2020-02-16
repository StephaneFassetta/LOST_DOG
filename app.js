const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const uuidv1 = require('uuid/v1');
var cookie = require('cookie');
const Swal = require('sweetalert2');

//__ Library
var app = require('./bin/www').app;
var io = require('./bin/www').io;
var socketTools = require('./classes/socketTools')(io);

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

app.use(function(req, res, next) {
    let cookieUuid = req.cookies.uuid;

    if (cookieUuid == undefined) {
        cookieUuid = uuidv1();
        res.cookie('uuid', cookieUuid);
    }

    next();
});

io.on('connection', function(socket){
    var cookies = cookie.parse(socket.handshake.headers.cookie);

    socket.roleList = ['Chien perdu', 'Taxidermiste', 'Pisteur des montagnes', 'Habitant', 'Pretre'];

    socket.on('createRoom', function (dataRoom) {
        socket.join(dataRoom.nameRoom);
        socket.pseudo = 'admin';
        io.sockets.in(dataRoom.nameRoom).emit('createRoom', {
            uuid : cookies.uuid,
            number : socketTools.nbrPlayerInRoom(dataRoom.nameRoom),
            list : socketTools.listUserInRoom(dataRoom.nameRoom)
        });
    });

    socket.on('joinRoom', function (dataRoom) {
        socket.join(dataRoom.nameRoom);
        socket.pseudo = dataRoom.pseudo;
        socket.roleInGame = socket.roleList[Math.floor(Math.random() * socket.roleList.length)];
        socket.roleList.splice(socket.roleList.indexOf(socket.roleInGame));

        io.sockets.in(dataRoom.nameRoom).emit('joinRoom', {
            uuid : cookies.uuid,
            number : socketTools.nbrPlayerInRoom(dataRoom.nameRoom),
            list : socketTools.listUserInRoom(dataRoom.nameRoom),
            roleInGame : socket.roleInGame
        });
    });

    socket.on('setRole', function (dataRoom) {
        socket.roleInGame = socket.roleList[Math.floor(Math.random() * socket.roleList.length)];
        socket.roleList.splice(socket.roleList.indexOf(socket.roleInGame));

        console.log(io.sockets.in(dataRoom.nameRoom).connected);

        io.sockets.in(dataRoom.nameRoom).to('setRole', {
            roleInGame : socket.roleInGame
        });
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
