
currentRoom = c; // Set Current Room at beginning of game
const inc = 10; // How many pixels to move at a time

/* CREATE HTML ELEMENTS */
    
const body = document.getElementsByTagName("body");
const main = document.createElement("main");
const lincoln = document.createElement("img");

let ne_obstacle = document.createElement("img");
let nw_obstacle = document.createElement("img");
let se_obstacle = document.createElement("img");
let sw_obstacle = document.createElement("img");

var mainLeftOffset = 0; // player's distance from the left border (in pixels)
var mainTopOffset = 0; // player's distance from the top border (in pixels)

function initialize() {
    mainLeftOffset = 0;
    mainTopOffset = 0;

    console.log("The current room is " + currentRoom.name);
    console.log(mainLeftOffset, mainTopOffset);
    console.log(lincoln.style.marginLeft, lincoln.style.marginTop);

    main.style.border = "solid 1px black";
    main.style.height = room_height + "px";
    main.style.width = room_width + "px";
    main.style.position = "fixed";
    main.style.padding = 0;

    // Background Image
    main.style.backgroundImage = "url(" + currentRoom.image_src + ")";
    main.style.backgroundSize = "cover";
    main.style.backgroundRepeat = "no-repeat";
    main.style.padding = 0;

    // Player
    lincoln.src = p1.source_filename;
    lincoln.width = player_width;
    lincoln.height = player_height;
    lincoln.onload = function() {
        var w = 50;
        var h = Math.ceil((this.naturalHeight / this.naturalWidth * w) / 10) * 10;
        // console.log(w, h);
        this.style.width = w + "px";
        this.style.height = h + "px";
    }
    lincoln.style.position = "fixed";
    lincoln.style.marginLeft = mainLeftOffset + "px";
    lincoln.style.marginTop = mainTopOffset + "px";

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
    body[0].append(main);
    main.append(lincoln);
    if (currentRoom.obstacle_ne) { main.append(ne_obstacle); }
    //if (currentRoom.obstacle_nw) { main.append(nw_obstacle); }
    //if (currentRoom.obstacle_se) { main.append(se_obstacle); }
    //if (currentRoom.obstacle_sw) { main.append(sw_obstacle); }

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
            northeast_corner_cond = mainTopOffset > 0 && (mainLeftOffset + lincoln.width) < (room_width - ne_obstacle.width);
            northwest_corner_cond = false; // TODO: Add logic for this
            
            if (mainTopOffset > ne_obstacle.height || northeast_corner_cond || northwest_corner_cond) {
                
                mainTopOffset -= inc;
                lincoln.style.marginTop = mainTopOffset + "px";
            
            } else if (mainTopOffset == 0) { // if this is actually the top boundary of the map

                if (currentRoom.room_north != null) { // if there is a room to the north
                    
                    console.log("Reached topmost boundary of map, moving to neighbor room to the north");
                    currentRoom = currentRoom.room_north; // switch to that room
                    initialize(); // re-initialize map

                } else { console.log("Reached topmost boundary of map, but there is no neighbor to the north"); }
            
            } else { console.log("At corner case"); }
        
        } else if (key == 's' || key == 'ArrowDown') { // Move Down
            if (mainTopOffset + lincoln.height < room_height) {

                mainTopOffset += inc;
                lincoln.style.marginTop = mainTopOffset + "px";
            } else {
                console.log("Reached bottommost boundary of map");
            }
        } else if (key == 'a' || key == 'A' || key == 'ArrowLeft') { // Move Left
            if (mainLeftOffset >= inc) {
                mainLeftOffset -= inc;
                lincoln.style.marginLeft = mainLeftOffset + "px";

                //console.log("MainLeftOffset = " + mainLeftOffset);
                //console.log(lincoln.style.marginLeft, lincoln.style.marginTop);
            } else {
                console.log("Reached leftmost boundary of map");
            }

        } else if (key == 'd' || key == 'ArrowRight') { // Move Right
            if (mainLeftOffset + lincoln.width < room_width - ne_obstacle.width ||
                (mainLeftOffset + lincoln.width < room_width && (mainTopOffset > ne_obstacle.height))
            ) {
                mainLeftOffset += inc;
                lincoln.style.marginLeft = mainLeftOffset + "px";
            } else {
                console.log("Reached rightmost boundary of map");
            }
        }
    }, true);
}