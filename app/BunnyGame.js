import createjs from 'preload-js'

import {
    Sprite,
    Container
} from './lightpixel';

import {
    Bunny
} from './components';

class BunnyGame {
    constructor(width = 300, height = 480, view = null) {
        // Initializes the game view (canvas)
        this.view = view || document.createElement('canvas');
        this.view.width = width;
        this.view.height = height;
        this.viewContext = this.view.getContext('2d');
        this.viewContext.fillStyle = '#4286f4';

        // Method bindings
        this.animationStep = this.animationStep.bind(this);
        this.onLoadingComplete = this.onLoadingComplete.bind(this);
        this.onInteraction = this.onInteraction.bind(this);

        // Initial parameters
        this.animationId = null;

        // Loads the assets
        this.preloader = new createjs.LoadQueue();
        this.preloader.on('complete', this.onLoadingComplete);
        this.preloader.loadManifest([
            {
                id: 'bunny',
                src:'static/bunny.png'
            }
        ]);
    }

    onInteraction (e) {
        e.stopPropagation();
        e.preventDefault();

        const positionSource = e.touches ? e.touches[0] : e;

        this.stage.propagateEvent('mousedown', [positionSource.pageX, positionSource.pageY]);
    }

    onLoadingComplete() {
        // Builds the stage
        this.stage = new Container();
        this.stage.x = this.view.width / 2;
        this.stage.y = this.view.height / 2;

        // Builds the bunnies
        this.bunnies = [];
        for (let i = 0; i < 4; i++) {
            const bunny = new Bunny(this.preloader.getResult('bunny'));
            bunny.scale = 2;
            bunny.rotationDeg = i * 90;

            this.bunnies.push(bunny);
            this.stage.addChild(bunny);
        }

        // Set up listeners in the canvas
        this.view.addEventListener('mousedown', this.onInteraction);
        this.view.addEventListener('touchstart', this.onInteraction);

        this.startAnimation();
    }

    startAnimation() {
        this.stopAnimation();
        this.animationId = window.requestAnimationFrame(this.animationStep);
    }

    animationStep(timestamp) {
        // Clear the canvas
        this.viewContext.fillRect(0, 0, this.view.width, this.view.height);

        // Rotate the stage a little bit
        this.stage.rotationDeg += 0.15;

        // Draw!
        this.stage.drawOn(this.viewContext);

        // Request the next animation frame
        this.animationId = window.requestAnimationFrame(this.animationStep);
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }
}

export default BunnyGame;
