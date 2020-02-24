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

var roomsActive = {};

//__ Views engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

//__ Use middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/classes', express.static(path.join(__dirname, 'classes')));


io.on('connection', function(socket) {
    console.log('Connexion au socket');

    socket.on('disconnect', function ()
    {
        if (socket.game) {
            const gameExist = socket.game;

            Object.keys(gameExist.players).forEach(function(key) {
                if (gameExist.players[key].socketId == socket.id) {
                    console.log('Le joueur ' + gameExist.players[key].name + ' à quitté la partie !');
                    gameExist.players.splice(gameExist.players.indexOf(gameExist.players[key]));
                }
            });

            io.sockets.to(gameExist.name).emit('refreshInfosUsersAndGame', { 'game' : gameExist });
        }
    });

    socket.on('joinGameRoom', function(dataRoom)
    {
        const gameExist = roomsActive[Object.keys(roomsActive).find((key) => key === dataRoom.name)];

        if (gameExist && gameExist.players.length < gameExist.size) {
            socket.join(dataRoom.name);
            gameExist.players.push(dataRoom.player);
            console.log('Vous avez rejoins une room. Nom de la room : ' + dataRoom.name);
            socket.game = gameExist;
            io.sockets.to(gameExist.name).emit('refreshInfosUsersAndGame', { 'game' : gameExist });
        }
    });

    socket.on('createGameRoom', function(game, callbackSuccess)
    {
        socket.join(game.name);
        roomsActive[game.name] = game;
        console.log('Une room vient d\'être créé. Nom de la room : ' + game.name);
        callbackSuccess();
    });

    socket.on('startGame', function(nameRoom)
    {
        let gameToStart = roomsActive[nameRoom.name];
        console.log('La partie ' + gameToStart.name + ' a été lancé ! C\'est parti !');


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
