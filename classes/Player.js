var Player = class {

    constructor(name, role, socketId, isAdmin){
        this.name = name;
        this.socketId = socketId;
        this.role = role;
        this.isAdmin = isAdmin;
        this.alive = true;
    }

};

module.exports = Player;