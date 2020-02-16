class socketTools
{
    constructor (io){}

    nbrPlayerInRoom(nameRoom) {
        var length = io.sockets.adapter.rooms[nameRoom].length;
        return length;
    }

    listUserInRoom(nameRoom) {
        let list = {};

        this.foreach(io.in(nameRoom).sockets, function (i, v) {
            list[v.id] = v.pseudo;
        });

        return list;
    }

    foreach(arr, func){
        for(var i in arr){
            func(i, arr[i]);
        }
    }
}

module.exports = (io) => { return new socketTools(io)}