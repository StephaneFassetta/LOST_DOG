class GameRoom {

    constructor(name, size, admin) {
        this.name = name;
        this.cards = [];
        this.size = size;
        this.players = [];
        this.admin = admin;
        this.status = "lobby";
    }

    getPlayerByName(name) {
        return this.players.find((player) => player.name === name);
    }
};

export default GameRoom;