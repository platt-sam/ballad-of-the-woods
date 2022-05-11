/* Set constants to be used */

const obstacle_width = 80;
const obstacle_height = 80;

const player_width = 50; // 50px wide
const player_height = 80; // 80px tall

const room_width = 750; // 750 px wide
const room_height = 600; // 600 px tall

/* Class Definitions */

let Obstacle = class {
    constructor(source_filename) {
        this.source_filename = source_filename;
    }
};

let Player = class {
    constructor(source_filename) {
        this.source_filename = source_filename;
    };
};

let Room = class {
    constructor(name, image_src) {
        this.image_src = image_src;
        this.name = name;
        // Neighbor rooms
        this.room_north = null;
        this.room_south = null;
        this.room_east = null;
        this.room_west = null;
        // Corner obstacles
        this.obstacle_ne = null;
        this.obstacle_nw = null;
        this.obstacle_se = null;
        this.obstacle_sw = null;
    }
    setNeighbors(room_north, room_south, room_east, room_west) {
        this.room_north = room_north;
        this.room_south = room_south;
        this.room_east = room_east;
        this.room_west = room_west;
    }
    setObstacles(obstacle_ne, obstacle_nw, obstacle_se, obstacle_sw) {
        this.obstacle_ne = obstacle_ne;
        this.obstacle_nw = obstacle_nw;
        this.obstacle_se = obstacle_se;
        this.obstacle_sw = obstacle_sw;
    }
};

/* Instantiate Player(s) */

let p1 = new Player("assets/lincoln.jpg");

/* Instantiate Obstacles */

var rock = new Obstacle("assets/rock-rough.png");
var light_tree = new Obstacle("assets/light-tree-rough.png");
var dark_tree = new Obstacle("assets/dark-tree-rough.png");

/* Instantiate Rooms */

var currentRoom;

var lightforest_0_0 = new Room("Light Forest (0, 0)", "assets/light-forest-rough.jpeg");
var lightforest_1_0 = new Room("Light Forest (1, 0)", "assets/light-forest-rough.jpeg");
var lightforest_2_0 = new Room("Light Forest (2, 0)", "assets/light-forest-rough.jpeg");
var lightforest_0_1 = new Room("Light Forest (0, 1)", "assets/light-forest-rough.jpeg");
var lightforest_1_1 = new Room("Light Forest (1, 1)", "assets/light-forest-rough.jpeg");
var lightforest_2_1 = new Room("Light Forest (2, 1)", "assets/light-forest-rough.jpeg");

var darkforest_3_0 = new Room("Dark Forest (3, 0)", "assets/dark-forest-rough.jpeg");
var darkforest_4_0 = new Room("Dark Forest (4, 0)", "assets/dark-forest-rough.jpeg");
var darkforest_5_0 = new Room("Dark Forest (5, 0)", "assets/dark-forest-rough.jpeg");
var darkforest_3_1 = new Room("Dark Forest (3, 1)", "assets/dark-forest-rough.jpeg");
var darkforest_4_1 = new Room("Dark Forest (4, 1)", "assets/dark-forest-rough.jpeg");
var darkforest_5_1 = new Room("Dark Forest (5, 1)", "assets/dark-forest-rough.jpeg");

var cave_4_2 = new Room("Cave (4, 2)", "assets/cave-rough.jpeg");

/* Set Each Room's Neighbor(s) */
//                           North              South               East                West
lightforest_0_0.setNeighbors(lightforest_0_1,   lightforest_0_1,    lightforest_1_0,    null);
lightforest_1_0.setNeighbors(lightforest_1_1,   lightforest_1_1,    lightforest_2_0,    lightforest_0_0);
lightforest_2_0.setNeighbors(lightforest_2_1,   lightforest_2_1,    darkforest_3_0,     lightforest_1_0);
lightforest_0_1.setNeighbors(lightforest_0_0,   lightforest_0_0,    lightforest_1_0,    lightforest_2_1);
lightforest_1_1.setNeighbors(lightforest_1_0,   lightforest_1_0,    lightforest_2_1,    lightforest_0_1);
lightforest_2_1.setNeighbors(lightforest_2_0,   lightforest_2_0,    null,               lightforest_1_1);

darkforest_3_0.setNeighbors(darkforest_3_1,     darkforest_3_1,     darkforest_4_0,     lightforest_2_0);
darkforest_4_0.setNeighbors(darkforest_4_1,     darkforest_4_1,     darkforest_5_0,     darkforest_3_0);
darkforest_5_0.setNeighbors(darkforest_5_1,     darkforest_5_1,     null,               darkforest_4_0);
darkforest_3_1.setNeighbors(darkforest_3_0,     darkforest_3_0,     darkforest_4_1,     null);
darkforest_4_1.setNeighbors(darkforest_4_0,     cave_4_2,           darkforest_5_1,     darkforest_3_1);
darkforest_5_1.setNeighbors(darkforest_5_0,     null,               darkforest_3_1,     darkforest_4_1);

cave_4_2.setNeighbors(darkforest_4_1,           null,               null,               null);

/* Set Each Room's Corner Obstacles */
//                           NE,         NW,    SE,     SW
lightforest_0_0.setObstacles(light_tree, null,  null,   null);