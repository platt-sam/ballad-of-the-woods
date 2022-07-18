/* Set constants to be used */

const obstacle_width = 150;
const obstacle_height = 150;

const player_height = 150; // 400px original
const player_width = 0.3475 * player_height; // 62.5% of player_height // 139px original

const room_width = 750; // 750 px wide
const room_height = 600; // 600 px tall

/* Class Definitions */

let Obstacle = class {
    constructor(source_filename, image_width, image_height) {
        this.source_filename = source_filename;
        this.image_width = image_width;
        this.image_height = image_height;
    }
};

let Player = class {
    constructor(source_filename, name) {
        this.source_filename = source_filename;
        this.name = name;
    };
};

let Character = class {
    constructor(source_filename, name, width, height) {
        this.source_filename = source_filename;
        this.name = name;
        this.width = width;
        this.height = height;
    }
};

let Music = class {
    constructor(source_filename) {
        this.source_filename = source_filename;
    }
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
        // Sheet Music
        this.music = null;
        // Character
        this.character = null;
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
    setCharacter(character) {
        this.character = character;
    }
    setMusic(music) {
        this.music = music;
    }
};

/* Instantiate Player(s) */

let p1 = new Player("assets/orpheus-front.png", "Orpheus");

/* Instantiate Obstacles */

var rock = new Obstacle("assets/rock.png");
var light_tree_ne = new Obstacle("assets/light-tree-ne.png", 257, 290);
var light_tree_nw = new Obstacle("assets/light-tree-nw.png", 257, 290);
var light_tree_se = new Obstacle("assets/light-tree-se.png", 257, 290);
var light_tree_sw = new Obstacle("assets/light-tree-sw.png", 257, 290);
var dark_tree = new Obstacle("assets/dark-tree.png", 0, 0);
var dark_tree_ne = new Obstacle("assets/dark-tree-ne.png", 0, 0);
var dark_tree_nw = new Obstacle("assets/dark-tree-nw.png", 0, 0);
var dark_tree_se = new Obstacle("assets/dark-tree-se.png", 0, 0);
var dark_tree_sw = new Obstacle("assets/dark-tree-sw.png", 0, 0);

/* Instantiate Music */

var music1 = new Music("assets/music-sheet.png");
var music2 = new Music("assets/music-sheet.png");
var music3 = new Music("assets/music-sheet.png");
var music4 = new Music("assets/music-sheet.png");

/* Instantiate Characters */

var charon = new Character("assets/boatman.png", "The Boatman", 90, 200);
var eurydice = new Character("assets/eurydice.png", "Eurydice", 40, 140);
var monster = new Character("assets/monster.png", "The Monster", 200, 196);

/* Instantiate Rooms */

var currentRoom;

var lightforest_0 = new Room("the Light Forest", "assets/light-forest-1.png");
var lightforest_1 = new Room("the Light Forest<br/><span style='font-family:sans-serif; font-size:8pt;'>Hint: Click on the mysterious Boatman</span>", "assets/light-forest-river.png");
var lightforest_2 = new Room("the Light Forest", "assets/light-forest-1.png");
var lightforest_3 = new Room("the Light Forest", "assets/light-forest-2.png");
var lightforest_4 = new Room("the Light Forest", "assets/light-forest-1.png");
var lightforest_5 = new Room("the Light Forest", "assets/light-forest-1.png");

var darkforest_0 = new Room("the Dark Forest", "assets/dark-forest-1.png");
var darkforest_1 = new Room("the Dark Forest", "assets/dark-forest-cave.png");
var darkforest_2 = new Room("the Dark Forest", "assets/dark-forest-2.png");
var darkforest_3 = new Room("the Dark Forest", "assets/dark-forest-2.png");
var darkforest_4 = new Room("the Dark Forest", "assets/dark-forest-1.png");
var darkforest_5 = new Room("the Dark Forest", "assets/dark-forest-2.png");

var cave_0 = new Room("the Cave", "assets/cave.png");
var cave_1 = new Room("the Cave", "assets/cave.png");
var cave_2 = new Room("the Cave", "assets/cave-gate.png");
var cave_3 = new Room("the Cave", "assets/cave.png");
var cave_4 = new Room("the Cave", "assets/cave.png");
var cave_5 = new Room("the Cave", "assets/cave.png");
var cave_6 = new Room("the dragon's lair", "assets/dragon.png");

/* Set Each Room's Neighbor(s) */
//                         North            South             East              West
lightforest_0.setNeighbors(lightforest_3,   lightforest_3,    lightforest_1,    lightforest_2);
lightforest_1.setNeighbors(null,            lightforest_4,    lightforest_2,    lightforest_0);
lightforest_2.setNeighbors(lightforest_5,   lightforest_5,    lightforest_0,    lightforest_1);
lightforest_3.setNeighbors(lightforest_0,   lightforest_0,    lightforest_1,    lightforest_5);
lightforest_4.setNeighbors(lightforest_1,   null,             lightforest_5,    lightforest_3);
lightforest_5.setNeighbors(lightforest_2,   lightforest_2,    lightforest_3,    lightforest_4);

darkforest_0.setNeighbors(darkforest_3,     darkforest_3,     darkforest_1,     darkforest_2);
darkforest_1.setNeighbors(null,             darkforest_4,     darkforest_2,     darkforest_0);
darkforest_2.setNeighbors(darkforest_5,     darkforest_5,     darkforest_0,     darkforest_1);
darkforest_3.setNeighbors(darkforest_0,     darkforest_0,     darkforest_4,     darkforest_5);
darkforest_4.setNeighbors(darkforest_1,     lightforest_1,    darkforest_5,     darkforest_3);
darkforest_5.setNeighbors(darkforest_2,     darkforest_2,     darkforest_3,     darkforest_4);

cave_0.setNeighbors(cave_5,                 cave_3,           cave_1,           cave_5);
cave_1.setNeighbors(cave_3,                 cave_4,           cave_3,           cave_0);
cave_2.setNeighbors(null,                   cave_5,           null,             null);
cave_3.setNeighbors(cave_0,                 cave_1,           cave_4,           cave_1);
cave_4.setNeighbors(cave_1,                 darkforest_1,     cave_5,           cave_3);
cave_5.setNeighbors(cave_2,                 cave_0,           cave_0,           cave_4);
cave_6.setNeighbors(null,                   cave_2,           null,             null);

/* Set Each Room's Corner Obstacles */
//                         NE,             NW,            SE,            SW
lightforest_0.setObstacles(light_tree_ne,  light_tree_nw, light_tree_se, light_tree_sw);
lightforest_1.setObstacles(light_tree_ne,  light_tree_nw, light_tree_se, light_tree_sw);
lightforest_2.setObstacles(light_tree_ne,  light_tree_nw, light_tree_se, light_tree_sw);
lightforest_3.setObstacles(light_tree_ne,  light_tree_nw, light_tree_se, light_tree_sw);
lightforest_4.setObstacles(light_tree_ne,  light_tree_nw, light_tree_se, light_tree_sw);
lightforest_5.setObstacles(light_tree_ne,  light_tree_nw, light_tree_se, light_tree_sw);

darkforest_0.setObstacles(dark_tree_ne,    dark_tree_nw,  dark_tree_se,  dark_tree_sw);
darkforest_1.setObstacles(dark_tree_ne,    dark_tree_nw,  dark_tree_se,  dark_tree_sw);
darkforest_2.setObstacles(dark_tree_ne,    dark_tree_nw,  dark_tree_se,  dark_tree_sw);
darkforest_3.setObstacles(dark_tree_ne,    dark_tree_nw,  dark_tree_se,  dark_tree_sw);
darkforest_4.setObstacles(dark_tree_ne,    dark_tree_nw,  dark_tree_se,  dark_tree_sw);
darkforest_5.setObstacles(dark_tree_ne,    dark_tree_nw,  dark_tree_se,  dark_tree_sw);

cave_0.setObstacles(null, rock, rock, rock);
cave_1.setObstacles(rock, null, rock, rock);
cave_2.setObstacles(null, null, rock, rock);
cave_3.setObstacles(rock, rock, rock, null);
cave_4.setObstacles(rock, null, rock, rock);
cave_5.setObstacles(null, rock, rock, rock);

/* Set Each Room's Character (if applicable) */

lightforest_1.setCharacter(charon); // aka the boatman
darkforest_1.setCharacter(monster); // aka cerberus
cave_6.setCharacter(eurydice);


/* Set Each Room's Music (if applicable) */

lightforest_5.setMusic(music1);
darkforest_2.setMusic(music2);
cave_0.setMusic(music3);