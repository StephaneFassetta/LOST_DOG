class GameRoom {

    constructor(name, size) {
        this.name = name;
        this.cards = [];
        this.size = size;
        this.players = [];
        this.status = "lobby";
    }
};

export default GameRoom;