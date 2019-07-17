# GridLock

## Overview
GridLock is a grid based game where player actions dictate game time. Enemies will only move when the player moves/attacks.
The goal of the game is to maneuver yourself around the board while keeping continually spawning enemies at bay. 

## MVPs
- [ ] 1. Generate a grid/tile-based board and style it
- [ ] 2. Allow player movement on the board
  - [ ] Movement should be one tile at a time
- [ ] 3. Allow enemy movement on the board
   - [ ] Enemies should only move on player movement
   - [ ] Movement should be one tile at a time
   - [ ] Enemies should move toward player position
- [ ] 4. Allow player to attack tiles next to them
- [ ] 5. Spawn increasingly more enemies as time passes

## Technologies
* JavaScript
* HTML5 Canvas
* Webpack
* HTML audio

## Timeline
 Day 1: Get board rendered and begin movement logic
 Day 2: Finish movement logic, get player attack to work, get enemies to move when player inputs
 Day 3: Finish enemy AI, style board and entities
 Day 4: Finish styling, add animations
