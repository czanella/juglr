import Game from './Game.js';

function initGameDesktop() {
    const game = new Game(600, 960);
    document.body.appendChild(game.view);
}

function initGameCordova() {
    const game = new Game(window.innerWidth, window.innerHeight);
    document.body.appendChild(game.view);
}

if (navigator.appName.indexOf('CocoonJS') >= 0) {
    document.addEventListener('deviceready', initGameCordova);
}
else {
    initGameDesktop();
}
