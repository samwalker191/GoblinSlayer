const Game = require("./classes/game");
const LevelOne = require("./util/levels/level1");
const GameView = require("./classes/game_view");
const whichTransitionEvent = require('./util/transition_detect_util');

document.addEventListener("DOMContentLoaded", () => {
    const boardCanvas = document.getElementById('board-canvas');
    const animateCanvas = document.getElementById('animate-canvas');
    const attackCanvas = document.getElementById('attack-canvas');
    const level1 = new LevelOne();
    let levels = [level1];
    const game = new Game(boardCanvas, animateCanvas, attackCanvas, levels);
    const gameView = new GameView(game)
    const goBack = document.getElementsByClassName('go-back')[0];
    const playBtn = document.getElementsByClassName('play-btn')[0];
    const startButton = document.getElementById('start-btn');
    const music = document.getElementById('music');
    const musicControls = document.getElementsByClassName('music-controls')[0];
    const musicPlay = document.getElementById('music-play');
    const musicPause = document.getElementById('music-pause');

    // create tool tip element
    const toolTip = document.createElement('div');
    toolTip.innerHTML = "Music will play when you click this";
    toolTip.classList.add('tool-tip');

    playBtn.addEventListener('click', () => {
        gameView.start();
    })
    
    startButton.addEventListener('click', () => {
        menu.classList.add('hidden');
        instructions.classList.add('hidden');
        goBack.classList.add('hidden');
        gameStory.classList.remove('animate-expand');
        playBtn.classList.remove('animate-expand');
        musicControls.classList.remove('hidden');
        music.play();
    })

    startButton.addEventListener('mouseover', () => {
        startButton.parentNode.insertBefore(toolTip, startButton);
    })

    startButton.addEventListener('mouseout', () => {
        toolTip.parentNode.removeChild(toolTip);
    })

    musicControls.addEventListener('click', () => {
        if (!music.paused) {
            music.pause();
            musicPlay.classList.remove('hidden');
            musicPause.classList.add('hidden');
        } else {
            music.play();
            musicPause.classList.remove('hidden');
            musicPlay.classList.add('hidden');
        }
    })

    const instructionsButton = document.getElementById('instructions-btn');
    const instructions = document.getElementsByClassName('instructions')[0];
    const gameStory = document.getElementsByClassName('game-story')[0];
    // instructions.classList.remove('hidden');
    const menu = document.getElementsByTagName('ul')[0];
    const goBackButton = document.getElementsByTagName('button')[0];
    let transitionEvent;

    const transitionFunc = () => {
        menu.classList.remove('hidden');
    }

    instructionsButton.addEventListener('click', () => {
        menu.classList.add('hidden');
        instructions.classList.remove('animate-expand');
        goBackButton.classList.remove('animate-expand');
        if (transitionEvent) {
            instructions.removeEventListener(transitionEvent, transitionFunc);
        }
    })

    goBackButton.addEventListener('click', () => {
        instructions.classList.add('animate-expand');
        goBackButton.classList.add('animate-expand');
        transitionEvent = whichTransitionEvent();

        if (transitionEvent) {
            instructions.addEventListener(transitionEvent, transitionFunc);
        }
    })

    setTimeout(() => {
        const header = document.getElementsByTagName('header')[0];
        header.classList.add('active');
        
    }, 500);

});