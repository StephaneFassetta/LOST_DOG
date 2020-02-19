var Game = class {
    roles = ["Villager", "Werewolf", "Seer", "Shadow", "Hunter", "Mason", "Minion", "Sorcerer"];

    constructor(name) {
        this.name = name;
        this.playerNumber = 0;
        this.players = [];
        this.status = 'main-menu';
    }
};

module.exports = Game;