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

let p1 = new Player("media/lincoln.jpg");

/* Instantiate Obstacles */

let stone = new Obstacle("https://pngimg.com/uploads/stone/stone_PNG13545.png");

/* Instantiate Rooms */

let currentRoom = null;

let a = new Room("a", "https://ak.picdn.net/shutterstock/videos/1017427615/thumb/11.jpg");
let b = new Room("b", "https://ozinga.com/wp-content/uploads/2020/09/22_CommonConcreteProblems-1024x500.jpg");
let c = new Room("c", "https://dirtsoilandmore.com/wp-content/uploads/sites/12/2014/02/dirt.jpg");
let d = new Room("d", "https://c0.wallpaperflare.com/preview/66/391/642/bird-s-eye-view-ocean-sea-seascape.jpg");

/* Set Each Room's Neighbor(s) */

a.setNeighbors(null, null, b, null);
b.setNeighbors(d, c, null, a);
c.setNeighbors(b, d, null, null);
d.setNeighbors(c, b, null, null);

/* Set Each Room's Corner Obstacles */
a.setObstacles(stone, null, null, null);
b.setObstacles(stone, null, null, null);
c.setObstacles(stone, null, null, null);
d.setObstacles(stone, null, null, null);