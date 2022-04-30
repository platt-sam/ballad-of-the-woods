let Room = class {
    constructor(image, height, width, room_north, room_south, room_east, room_west, obstacle_ne, obstacle_nw, obstacle_se, obstacle_sw) {
        this.image = image;
        this.height = height;
        this.width = width;
        // neighboring rooms
        this.room_north = room_north;
        this.room_south = room_south;
        this.room_east = room_east;
        this.room_west = room_west;
        // obstacles
        this.obstacle_ne = obstacle_ne;
        this.obstacle_nw = obstacle_nw;
        this.obstacle_se = obstacle_se;
        this.obstacle_sw = obstacle_sw;
    }
}
let Obstacle = class {
    constructor(image, height, width) {
        this.image = image;
        this.height = height;
        this.width = width;
    }
};
let Player = class {
    constructor(image, height, width) {
        this.image = image;
        this.height = height;
        this.width = width;
    }
}

var p = new Player("media/lincoln.jpg", 0, 0);

var stoneObstacle = new Obstacle("", 80, 80);

var example = new Room("url('https://ak.picdn.net/shutterstock/videos/1017427615/thumb/11.jpg')", 400, 500);

example.obstacle_ne = stone;

function initialize() {
    /* CREATE HTML ELEMENTS */
    
    const body = document.querySelector("body");
    const main = document.createElement("main");
    const player = document.createElement("img");
    const stone = document.createElement("img");

    /* SET ELEMENT STYLES */

    var widthOfMain = 500; // width of the playable area (in pixels)
    var heightOfMain = 400; // height of the playable area (in pixels)

    var mainLeftOffset = 0; // player's distance from the left border (in pixels)
    var mainTopOffset = 0; // player's distance from the top border (in pixels)

    main.style.border = "solid 1px black";
    main.style.height = example.height + "px";
    main.style.width = example.width + "px";
    main.style.position = "fixed";
    main.style.marginLeft = mainLeftOffset;
    main.style.marginTop = mainTopOffset;
    main.style.padding = 0;

    // Background Image
    main.style.backgroundImage = example.image;
    main.style.backgroundSize = "cover";
    main.style.backgroundRepeat = "no-repeat";
    main.style.padding = 0;

    // Player
    player.src = player.image;
    player.onload = function() {
        var w = 50;
        var h = Math.ceil((this.naturalHeight / this.naturalWidth * w) / 10) * 10;
        console.log(w, h);
        this.style.width = w + "px";
        this.style.height = h + "px";
    }
    player.style.position = "fixed";
    player.style.marginLeft = 0;
    player.style.marginTop = 0;

    // Item in top right corner
    stone.src = "https://pngimg.com/uploads/stone/stone_PNG13545.png";
    stone.style.width = stone.width + "px";
    stone.style.height = stone.height + "px";
    stone.style.position = "fixed";
    stone.style.marginLeft = example.width - stone.width + "px";
    stone.style.marginTop = "0px";
    stone.style.filter = "grayscale(100)";

    /* SET THE INNER CONTENT OF THE ELEMENTS */

    /* LINK THE ELEMENTS TOGETHER */
    body.append(main);
    main.append(player);
    main.append(stone);

    /* ADD EVENT LISTENERS */

    window.addEventListener("keydown", function(event) {
        // console.log(`KeyboardEvent: ${event.key}`); // for debugging and testing purposes
        var key = event.key;

        var inc = 10; // How many pixels to move at a time

        if (key == 'w' || key == 'ArrowUp') { // Move Up
            if (mainTopOffset > stone.height || 
                (mainTopOffset > 0 && (mainLeftOffset + player.width) < (widthOfMain - stone.width))
            ) {
                mainTopOffset -= inc;
                player.style.marginTop = mainTopOffset + "px";
            } else {
                console.log("Reached topmost boundary of map");
            }
        } else if (key == 's' || key == 'ArrowDown') { // Move Down
            if (mainTopOffset + player.height < heightOfMain) {
                mainTopOffset += inc;
                player.style.marginTop = mainTopOffset + "px";
            } else {
                console.log("Reached bottommost boundary of map");
            }

        } else if (key == 'a' || key == 'A' || key == 'ArrowLeft') { // Move Left
            if (mainLeftOffset > 0) {
                mainLeftOffset -= inc;
                player.style.marginLeft = mainLeftOffset + "px";
            } else {
                console.log("Reached leftmost boundary of map");
            }

        } else if (key == 'd' || key == 'ArrowRight') { // Move Right
            if (mainLeftOffset + player.width < widthOfMain - stone.width ||
                (mainLeftOffset + player.width < widthOfMain && (mainTopOffset > stone.height))
            ) {
                mainLeftOffset += inc;
                player.style.marginLeft = mainLeftOffset + "px";
            } else {
                console.log("Reached rightmost boundary of map");
            }
        }
    }, true);
}