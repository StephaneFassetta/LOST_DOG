const babel = require("@babel/register")({presets: ["@babel/preset-env"]});
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//__ Library
const app = require('./bin/www').app;
const io = require('./bin/www').io;
const tools = require('./classes/Tools');

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
app.use('/fa', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
app.use('/animate', express.static(path.join(__dirname, 'node_modules/animate.css')));
app.use('/hover', express.static(path.join(__dirname, 'node_modules/hover.css')));
app.use('/typewriter', express.static(path.join(__dirname, 'node_modules/typewriter-effect')));


io.on('connection', function(socket) {
    console.log('Connexion au socket');

    socket.on('disconnect', function ()
    {
        if (socket.game) {
            const gameExist = socket.game;
            const playerLeave = gameExist.players.find((player) => player.socketId === socket.id);

            Object.keys(gameExist.players).forEach(function(key) {
                if (gameExist.players[key].socketId == socket.id) {
                    console.log('Le joueur ' + gameExist.players[key].name + ' à quitté la partie !');
                    gameExist.players.splice(gameExist.players.indexOf(gameExist.players[key]));
                }
            });

            io.sockets.to(gameExist.name).emit('refreshInfosUsersAndGame', { 'game' : gameExist, 'user' : playerLeave, 'event' : 'disconnectToGame'});
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
            io.sockets.to(gameExist.name).emit('refreshInfosUsersAndGame', { 'game' : gameExist, 'user' : dataRoom.player, 'event' : 'joinGameRoom'});
        }
    });

    socket.on('createGameRoom', function(game)
    {
        socket.join(game.name);
        roomsActive[game.name] = game;
        console.log('Une room vient d\'être créé. Nom de la room : ' + game.name);
        io.sockets.to(game.name).emit('refreshInfosUsersAndGame', { 'game' : game, 'user' : game.admin, 'event' : 'createGameRoom'});
    });

    socket.on('startGame', function(nameRoom)
    {
        let gameToStart = roomsActive[nameRoom.name];

        if (gameToStart && gameToStart.status == 'lobby' && gameToStart.size == gameToStart.cards.length && gameToStart.size == gameToStart.players.length) {
            console.log('La partie ' + gameToStart.name + ' a été lancé ! C\'est parti !');
            gameToStart.status = 'started';
            tools.shuffleArray(gameToStart.cards);

            gameToStart.players.forEach(function (element, index) {
                element.role = gameToStart.cards[index];
            });

            io.sockets.to(gameToStart.name).emit('launchGame', gameToStart);
        }
    });

    socket.on('updateActualGame', function(nameRoom) {
        const game = roomsActive[Object.keys(roomsActive).find((key) => key === nameRoom.name)];
        io.sockets.to(game.name).emit('retrieveActualGame', game);
    });

    socket.on('vibratePlayer', function(informations) {
        io.sockets.to(informations.socketId).emit('vibratePlayer');
    });

    socket.on('killPlayer', function(informations) {
        let game = roomsActive[Object.keys(roomsActive).find((key) => key === informations.nameRoom)];
        let socketId = informations.socketId;
        let player = game.players.find((player) => player.socketId === socketId);
        player.alive = false;
        game.lastPlayerKilled = player;
        io.sockets.to(game.name).emit('killPlayer', game);
    });
});

// Make io accessible to our router
app.use(function(req,res,next) {
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