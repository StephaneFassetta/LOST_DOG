class GameRoom {

    constructor(name, size) {
        this.name = name;
        this.deck = [];
        this.size = size;
        this.players = [];
        this.status = "lobby";
    }
};

export default GameRoom;