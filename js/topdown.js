
currentRoom = c; // Set Current Room at beginning of game
const inc = 5; // How many pixels to move at a time

/* CREATE HTML ELEMENTS */
    
const main = document.getElementsByTagName("main");
const board = document.createElement("board");
const lincoln = document.createElement("img");

let ne_obstacle = document.createElement("img");
let nw_obstacle = document.createElement("img");
let se_obstacle = document.createElement("img");
let sw_obstacle = document.createElement("img");

var boardLeftOffset = 0; // player's distance from the left border (in pixels)
var boardTopOffset = 0; // player's distance from the top border (in pixels)

/* ADD EVENT LISTENERS */

window.addEventListener("keydown", function(event) {
    // console.log(`KeyboardEvent: ${event.key}`); // for debugging and testing purposes
    var key = event.key;

    var northeast_corner_cond = null;
    var northwest_corner_cond = null;
    var southeast_corner_cond = null;
    var southwest_corner_cond = null;

    if (key == 'w' || key == 'ArrowUp') { // Move Up
        
        // Set corner conditions for going up
        northeast_corner_cond = boardTopOffset > 0 && (boardLeftOffset + lincoln.width) < (room_width - ne_obstacle.width);
        northwest_corner_cond = false; // TODO: Add logic for this
        
        if (boardTopOffset > ne_obstacle.height || northeast_corner_cond || northwest_corner_cond) {
            
            boardTopOffset -= inc;
            lincoln.style.marginTop = boardTopOffset + "px";
        
        } else if (boardTopOffset == 0) { // if this is actually the top boundary of the map

            if (currentRoom.room_north != null) { // if there is a room to the north
                
                console.log("Reached topmost boundary of map, moving to neighbor room to the north");
                currentRoom = currentRoom.room_north; // switch to that room
                initialize(); // re-initialize map

            } else { console.log("Reached topmost boundary of map, but there is no neighbor to the north"); }
        
        } else { console.log("At corner case"); }
    
    } else if (key == 's' || key == 'ArrowDown') { // Move Down
        if (boardTopOffset + lincoln.height < room_height) {

            boardTopOffset += inc;
            lincoln.style.marginTop = boardTopOffset + "px";
        } else {
            console.log("Reached bottommost boundary of map");
        }
    } else if (key == 'a' || key == 'A' || key == 'ArrowLeft') { // Move Left
        if (boardLeftOffset >= inc) {
            boardLeftOffset -= inc;
            lincoln.style.marginLeft = boardLeftOffset + "px";

            //console.log("boardLeftOffset = " + boardLeftOffset);
            //console.log(lincoln.style.marginLeft, lincoln.style.marginTop);
        } else {
            console.log("Reached leftmost boundary of map");
        }

    } else if (key == 'd' || key == 'ArrowRight') { // Move Right
        if (boardLeftOffset + lincoln.width < room_width - ne_obstacle.width ||
            (boardLeftOffset + lincoln.width < room_width && (boardTopOffset > ne_obstacle.height))
        ) {
            boardLeftOffset += inc;
            lincoln.style.marginLeft = boardLeftOffset + "px";
        } else {
            console.log("Reached rightmost boundary of map");
        }
    }
}, true);

function initialize() {
    boardLeftOffset = 0;
    boardTopOffset = 0;

    console.log("The current room is " + currentRoom.name);
    console.log(boardLeftOffset, boardTopOffset);
    console.log(lincoln.style.marginLeft, lincoln.style.marginTop);

    board.style.border = "solid 1px black";
    board.style.height = room_height + "px";
    board.style.width = room_width + "px";
    board.style.position = "fixed";
    board.style.padding = 0;

    // Background Image
    board.style.backgroundImage = "url(" + currentRoom.image_src + ")";
    board.style.backgroundSize = "cover";
    board.style.backgroundRepeat = "no-repeat";
    board.style.padding = 0;

    // Player
    lincoln.src = p1.source_filename;
    lincoln.width = player_width;
    lincoln.height = player_height;
    lincoln.onload = function() {
        var w = 50;
        //var h = Math.ceil((this.naturalHeight / this.naturalWidth * w) / 10) * 10;
        // console.log(w, h);
        this.style.width = lincoln.width + "px";
        this.style.height = lincoln.height + "px";
    }
    lincoln.style.position = "fixed";
    lincoln.style.marginLeft = boardLeftOffset + "px";
    lincoln.style.marginTop = boardTopOffset + "px";

    // Northeast Obstacle
    ne_obstacle.src = currentRoom.obstacle_ne.source_filename;
    ne_obstacle.style.width = obstacle_width + "px";
    ne_obstacle.style.height = obstacle_height + "px";
    ne_obstacle.style.position = "fixed";
    ne_obstacle.style.marginLeft = room_width - obstacle_width + "px";
    ne_obstacle.style.marginTop = "0px";
    ne_obstacle.style.filter = "grayscale(100)";
    ne_obstacle.style.backgroundColor = "white";

    // Northwest Obstacle

    // Southeast Obstacle

    // Southwest Obstacle

    /* SET THE INNER CONTENT OF THE ELEMENTS */

    /* LINK THE ELEMENTS TOGETHER */
    main[0].append(board);
    board.append(lincoln);
    if (currentRoom.obstacle_ne) { board.append(ne_obstacle); }
    //if (currentRoom.obstacle_nw) { board.append(nw_obstacle); }
    //if (currentRoom.obstacle_se) { board.append(se_obstacle); }
    //if (currentRoom.obstacle_sw) { board.append(sw_obstacle); }
}