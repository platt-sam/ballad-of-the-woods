/* Set constants to be used */

const obstacle_width = 80;
const obstacle_height = 80;

const player_width = 100; // 100px wide
const player_height = 160; // 160px tall

const room_width = 750; // 750 px wide
const room_height = 600; // 600 px tall

/* Class Definitions */

let Obstacle = class {
    constructor(source_filename) {
        this.source_filename = source_filename;
    }
};

let Player = class {
    constructor(source_filename, name) {
        this.source_filename = source_filename;
        this.name = name;
    };
};

let Character = class {
    constructor(source_filename, name) {
        this.source_filename = source_filename;
        this.name = name;
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

let p1 = new Player("assets/orpheus-front-rough.png", "Orpheus");

/* Instantiate Obstacles */

var rock = new Obstacle("assets/rock.png");
var light_tree = new Obstacle("assets/light-tree.png");
var dark_tree = new Obstacle("assets/dark-tree.png");

/* Instantiate Characters */

var charon = new Character("assets/boatman-rough.png", "The Boatman");
var eurydice = new Character("assets/eurydice-rough.png", "Eurydice");
var monster = new Character("assets/boatman-rough.png", "The Monster"); // TODO: change this to the monster image

/* Instantiate Rooms */

var currentRoom;

var lightforest_0 = new Room("the Light Forest", "assets/light-forest.png");
var lightforest_1 = new Room("the Light Forest", "assets/light-forest.png");
var lightforest_2 = new Room("the Light Forest", "assets/light-forest.png");
var lightforest_3 = new Room("the Light Forest", "assets/light-forest.png");
var lightforest_4 = new Room("the Light Forest", "assets/light-forest.png");
var lightforest_5 = new Room("the Light Forest", "assets/light-forest.png");

var darkforest_0 = new Room("the Dark Forest", "assets/dark-forest-w-mushrooms.png");
var darkforest_1 = new Room("the Dark Forest", "assets/dark-forest-w-mushrooms.png");
var darkforest_2 = new Room("the Dark Forest", "assets/dark-forest-w-mushrooms.png");
var darkforest_3 = new Room("the Dark Forest", "assets/dark-forest-w-mushrooms.png");
var darkforest_4 = new Room("the Dark Forest", "assets/dark-forest-w-mushrooms.png");
var darkforest_5 = new Room("the Dark Forest", "assets/dark-forest-w-mushrooms.png");

var cave_0 = new Room("a cave", "assets/cave.png");
var cave_1 = new Room("a cave", "assets/cave.png");
var cave_2 = new Room("a cave", "assets/cave.png");
var cave_3 = new Room("a cave", "assets/cave.png");
var cave_4 = new Room("a cave", "assets/cave.png");
var cave_5 = new Room("a cave", "assets/cave.png");

/* Set Each Room's Neighbor(s) */
//                         North            South             East              West
lightforest_0.setNeighbors(lightforest_3,   lightforest_3,    lightforest_1,    lightforest_2);
lightforest_1.setNeighbors(null,            lightforest_4,    lightforest_2,    lightforest_0);
lightforest_2.setNeighbors(lightforest_5,   lightforest_5,    lightforest_0,    lightforest_1);
lightforest_3.setNeighbors(lightforest_0,   lightforest_0,    lightforest_1,    lightforest_5);
lightforest_4.setNeighbors(lightforest_1,   null,             lightforest_5,    lightforest_3);
lightforest_5.setNeighbors(lightforest_2,   lightforest_2,    lightforest_3,             lightforest_4);

darkforest_0.setNeighbors(darkforest_3,     darkforest_3,     darkforest_1,     darkforest_2);
darkforest_1.setNeighbors(null,             darkforest_4,     darkforest_2,     darkforest_0);
darkforest_2.setNeighbors(darkforest_5,     darkforest_5,     darkforest_0,     darkforest_1);
darkforest_3.setNeighbors(darkforest_0,     darkforest_0,     darkforest_4,     darkforest_5);
darkforest_4.setNeighbors(darkforest_1,     lightforest_1,    darkforest_5,     darkforest_3);
darkforest_5.setNeighbors(darkforest_2,     darkforest_2,     darkforest_3,     darkforest_4);

cave_4.setNeighbors(null,                   darkforest_1,     null,             null);

/* Set Each Room's Corner Obstacles */
//                         NE,          NW,         SE,         SW
lightforest_0.setObstacles(light_tree,  light_tree, light_tree, light_tree);
lightforest_1.setObstacles(light_tree,  light_tree, light_tree, light_tree);
lightforest_2.setObstacles(light_tree,  light_tree, light_tree, light_tree);
lightforest_3.setObstacles(light_tree,  light_tree, light_tree, light_tree);
lightforest_4.setObstacles(light_tree,  light_tree, light_tree, light_tree);
lightforest_5.setObstacles(light_tree,  light_tree, light_tree, light_tree);

darkforest_0.setObstacles(dark_tree,    dark_tree,  dark_tree,  dark_tree);
darkforest_1.setObstacles(dark_tree,    dark_tree,  dark_tree,  dark_tree);
darkforest_2.setObstacles(dark_tree,    dark_tree,  dark_tree,  dark_tree);
darkforest_3.setObstacles(dark_tree,    dark_tree,  dark_tree,  dark_tree);
darkforest_4.setObstacles(dark_tree,    dark_tree,  dark_tree,  dark_tree);
darkforest_5.setObstacles(dark_tree,    dark_tree,  dark_tree,  dark_tree);

cave_4.setObstacles(rock, rock, rock, rock);

/* Set Each Room's Character */

lightforest_1.setCharacter(charon);
darkforest_1.setCharacter(monster);