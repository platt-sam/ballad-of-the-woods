
currentRoom = lightforest_1; // Set Current Room at beginning of game
const inc = 20; // How many pixels to move at a time

/* CREATE HTML ELEMENTS */
    
const main = document.getElementsByTagName("main");
const board = document.createElement("board");
const orpheus = document.createElement("img");
orpheus.style.border = "solid 1px black"; // delete this at launch, here for debugging

const ne_obstacle = document.createElement("img");
const nw_obstacle = document.createElement("img");
const se_obstacle = document.createElement("img");
const sw_obstacle = document.createElement("img");

window.alert("Use wasd or arrow keys to move around the board and between rooms");

var boardLeftOffset = (room_width - player_width) / 2; // player's distance from the left border (in pixels)
var boardTopOffset = (room_height - player_height); // player's distance from the top border (in pixels)

/* ADD EVENT LISTENERS */

window.addEventListener("keydown", function(event) {
    // console.log(`KeyboardEvent: ${event.key}`); // for debugging and testing purposes
    var key = event.key;

    if (key == 'w' || key == 'ArrowUp') { // Move Up
        orpheus.src = "assets/orpheus-back-rough.png";

        // Set corner conditions for going up
        if (boardTopOffset > 0) {
            
            if ( (boardTopOffset > obstacle_height) || ( (boardLeftOffset > obstacle_width) && (boardLeftOffset < room_width - obstacle_width - player_width) ) ) {

                boardTopOffset -= inc;
                orpheus.style.marginTop = boardTopOffset + "px";

            } else {
                // console.log("At corner case");
            }
        
        } else if (boardTopOffset == 0) { // if this is actually the top boundary of the map

            if (currentRoom.room_north != null) { // if there is a room to the north
                
                // console.log("Reached topmost boundary of map, moving to neighbor room to the north");
                
                currentRoom = currentRoom.room_north; // switch to that room
                boardTopOffset = (room_height - player_height);
                
                initialize(); // re-initialize map

            } else {
                // console.log("Reached topmost boundary of map, but there is no neighbor to the north");
            }
        
        } else {
            // console.log("At corner case");
        }
    
    } else if (key == 's' || key == 'ArrowDown') { // Move Down
        orpheus.src = "assets/orpheus-front-rough.png"; // facing front image

        if (boardTopOffset + orpheus.height < room_height) {

            if ( (boardTopOffset < room_height - orpheus.height - obstacle_height) || ( (boardLeftOffset > obstacle_width) && (boardLeftOffset < room_width - obstacle_width - player_width) ) ) {

                boardTopOffset += inc;
                orpheus.style.marginTop = boardTopOffset + "px";

            } else {
                // console.log("At corner case");
            }

        } else { // at bottom of map
            if (currentRoom.room_south != null) { // if there is a room to the south
                // console.log("Reached bottommost boundary of map, moving to neighbor room to the south");

                currentRoom = currentRoom.room_south; // switch to that room
                boardTopOffset = 0;

                initialize(); // re-initialize map
            } else {
                // console.log("Reached bottommost boundary of map, but there is no neighbor to the south");
            }
        }
    } else if (key == 'a' || key == 'A' || key == 'ArrowLeft') { // Move Left
        orpheus.src = "assets/orpheus-front-rough.png"; // facing front image
        orpheus.style.transform = "scaleX(-1)"; // flip image to face left

        if (boardLeftOffset >= inc) {
            if ( (boardLeftOffset > obstacle_width) || ( (boardTopOffset > obstacle_height) && (boardTopOffset < room_height - obstacle_height - player_height) ) ) {

                boardLeftOffset -= inc;
                orpheus.style.marginLeft = boardLeftOffset + "px";
            } else { console.log("At corner case"); }
        } else {
            if (currentRoom.room_west != null) { // if there is a room to the west
                // console.log("Reached leftmost boundary of map, moving to neighbor room to the west");

                currentRoom = currentRoom.room_west; // switch to that room
                boardLeftOffset = (room_width - player_width);

                initialize(); // re-initialize map
            } else {
                // console.log("Reached leftmost boundary of map, but there is no neighbor to the west");
            }
        }

    } else if (key == 'd' || key == 'ArrowRight') { // Move Right
        orpheus.src = "assets/orpheus-front-rough.png"; // facing front image
        orpheus.style.transform = "scaleX(1)"; // flip image to face left

        if (boardLeftOffset < room_width - player_width - inc) {

            if ( (boardLeftOffset < room_width - player_width - inc - obstacle_width) || ( (boardTopOffset > obstacle_height) && (boardTopOffset < room_height - obstacle_height - player_height) ) ) {

                boardLeftOffset += inc;
                orpheus.style.marginLeft = boardLeftOffset + "px";
            } else {
                // console.log("At corner case.");
            }

        } else {
            if (currentRoom.room_east != null) { // if there is a room to the east
                // console.log("Reached rightmost boundary of map, moving to neighbor room to the east");

                currentRoom = currentRoom.room_east; // switch to that room
                boardLeftOffset = 0;

                initialize(); // re-initialize map
            } else {
                // console.log("Reached rightmost boundary of map, but there is no neighbor to the east");
            }
        }
    }
}, true);

function initialize() {

    // console.log("You are in " + currentRoom.name);
    // console.log(boardLeftOffset, boardTopOffset);
    // console.log(orpheus.style.marginLeft, orpheus.style.marginTop);

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
    orpheus.src = p1.source_filename;
    orpheus.width = player_width;
    orpheus.height = player_height;
    orpheus.onload = function() {
        var w = 50;
        //var h = Math.ceil((this.naturalHeight / this.naturalWidth * w) / 10) * 10;
        // console.log(w, h);
        this.style.width = orpheus.width + "px";
        this.style.height = orpheus.height + "px";
    }
    orpheus.style.position = "fixed";
    orpheus.style.marginLeft = boardLeftOffset + "px";
    orpheus.style.marginTop = boardTopOffset + "px";

    // Northeast Obstacle
    if (currentRoom.obstacle_ne != null) {
        ne_obstacle.src = currentRoom.obstacle_ne.source_filename;
        ne_obstacle.style.width = obstacle_width + "px";
        ne_obstacle.style.height = obstacle_height + "px";
        ne_obstacle.style.position = "fixed";
        ne_obstacle.style.marginLeft = room_width - obstacle_width + "px";
        ne_obstacle.style.marginTop = "0px";
    }
    // Northwest Obstacle
    if (currentRoom.obstacle_nw != null) {
        nw_obstacle.src = currentRoom.obstacle_nw.source_filename;
        nw_obstacle.style.width = obstacle_width + "px";
        nw_obstacle.style.height = obstacle_height + "px";
        nw_obstacle.style.position = "fixed";
        nw_obstacle.style.marginLeft = "0px";
        nw_obstacle.style.marginTop = "0px";
    }
    // Southeast Obstacle
    if (currentRoom.obstacle_se != null) {
        se_obstacle.src = currentRoom.obstacle_se.source_filename;
        se_obstacle.style.width = obstacle_width + "px";
        se_obstacle.style.height = obstacle_height + "px";
        se_obstacle.style.position = "fixed";
        se_obstacle.style.marginLeft = room_width - obstacle_width + "px";
        se_obstacle.style.marginTop = room_height - obstacle_height + "px";
    }
    // Southwest Obstacle
    if (currentRoom.obstacle_sw != null) {
        sw_obstacle.src = currentRoom.obstacle_sw.source_filename;
        sw_obstacle.style.width = obstacle_width + "px";
        sw_obstacle.style.height = obstacle_height + "px";
        sw_obstacle.style.position = "fixed";
        sw_obstacle.style.marginLeft = "0px";
        sw_obstacle.style.marginTop = room_height - obstacle_height + "px";
    }

    /* SET THE INNER CONTENT OF THE ELEMENTS */

    /* LINK THE ELEMENTS TOGETHER */
    main[0].append(board);
    board.append(orpheus);
    if (currentRoom.obstacle_ne) { board.append(ne_obstacle); }
    if (currentRoom.obstacle_nw) { board.append(nw_obstacle); }
    if (currentRoom.obstacle_se) { board.append(se_obstacle); }
    if (currentRoom.obstacle_sw) { board.append(sw_obstacle); }
}