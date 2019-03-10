Subway Surfers, made in WebGL
=============================

Description of the game
-----------------------

### Controls:

    a,left  : move LEFT
    d,right : move RIGHT
    space   : JUMP
    enter   : change appearance to grayscale
    up      : flash the walls

### Obstacles:

#### Type1: 
    Obstacles which on collision end the game. They are:
    1. Trains
    2. Pillars

#### Type2: 
    Obstacles which on collision stumble the player and reduce it's speed, thus, making the 
    police dog come near to it. This reduces the health of the player.

    1. Barriers
    2. Pillars(change the lane after the collision, else the officer will catch you!)

### Other objects:

##### Tracks
    3 tracks, the player can run on either of them.

##### Walls
    The subway is surrounded by walls on either side.

##### Ceiling

##### Trains
    Cannot jump over them unless the super sneakers powerup is enabled!

##### Coins:
    Increase the score of the player by 50.

##### Powerups:
    Give the player some special abilities. They are:
    1. Super Sneakers
    2. Jetpack
    3. 2x Score Multiplier
    Each powerup lasts for 10 seconds, and the time remaining is shown on the slider above.

##### Power Slider
    Shows the strength of the current powerup remaining

##### Police Officer
    Chases the player continously, but falls far because is slow, but if the player stumbles over the barrier and slows down, it catches up and chases the player again.

##### Police Dog
    Gives the player a continuous chase, and when the player slows down on stumbling, waits for the
    officer to catch the player instead of biting the player :P

##### EndPoint
    Final checkpoint saying "You Won", upon reaching which the game is won!

### BONUS ADDED:

##### Textures for all objects!
##### Lighting(ambient)
##### Background subway surfers audio
##### Police Dog
