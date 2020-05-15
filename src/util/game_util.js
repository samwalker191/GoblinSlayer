const Util = {
    randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    
    outerPos: [
        [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2], [8,2], [9,2],
        [1,3], [9,3],
        [1,4], [9,4],
        [1,5], [9,5],
        [1,6], [9,6],
        [1,7], [9,7],
        [1,8], [2,8], [3,8], [4,8], [5,8], [6,8], [7,8], [8,8], [9,8]
    ]

};

module.exports = Util;