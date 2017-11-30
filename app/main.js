import App from './App.js';

function initAppDesktop() {
    const app = new App(600, 960);
    document.body.appendChild(app.view);
}

function initAppCordova() {
    const app = new App(window.innerWidth, window.innerHeight);
    document.body.appendChild(app.view);
}

if (navigator.appName.indexOf('CocoonJS') >= 0) {
    document.addEventListener('deviceready', initAppCordova);
}
else {
    initAppDesktop();
}
