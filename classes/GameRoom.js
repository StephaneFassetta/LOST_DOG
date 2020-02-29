class GameRoom {

    constructor(name, size, admin) {
        this.name = name;
        this.cards = [];
        this.size = size;
        this.players = [];
        this.admin = admin;
        this.status = "lobby";
    }
};

export default GameRoom;