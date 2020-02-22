class Player {

    constructor(name, role, socketId, isAdmin) {
        this.name = name;
        this.socketId = socketId;
        this.isAdmin = isAdmin;
        this.role = role;
        this.alive = true;
    }

};

export default Player;