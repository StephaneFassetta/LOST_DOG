export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function foreach(arr, func) {
    for (var i in arr) {
        func(i, arr[i]);
    }
}

export function isAdmin(player) {
    let isAdmin = false;

    if (player.isAdmin == 1) {
        isAdmin = true;
    }

    return isAdmin;
}