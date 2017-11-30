import { Sprite, Container, Mask } from './lightpixel';

import { Ball, BallBox, OutlineText } from './components';

class App {
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
        this.addBalls = this.addBalls.bind(this);

        // Initial parameters
        this.animationId = null;
        this.previousTimestamp = null;

        // // Loads the assets
        // this.preloader = new createjs.LoadQueue();
        // this.preloader.on('complete', this.onLoadingComplete);
        // this.preloader.loadManifest([
        //     {
        //         id: 'logo',
        //         src:'static/logo.png'
        //     },
        // ]);

        // Set up listeners in the canvas
        this.view.addEventListener('mousedown', this.onInteraction);
        this.view.addEventListener('touchstart', this.onInteraction);

        // Builds the ballBox
        this.ballBox = new BallBox(this.view.width, this.view.height, 0, 800);
        this.ballBox.on('mousedown', this.addBalls);

        // Builds the scoreboard
        this.score = new OutlineText('Eita', 80);
        this.score.x = this.view.width / 2;
        this.score.y = 40;

        // Builds the stage
        this.stage = new Container();
        this.stage.addChild(this.ballBox);
        this.stage.addChild(this.score);

        this.startAnimation();
    }

    startAnimation() {
        this.stopAnimation();
        this.animationId = window.requestAnimationFrame(this.animationStep);
    }

    animationStep(timestamp) {
        // Computes the delta
        const delta = (timestamp - (this.previousTimestamp || timestamp)) / 1000;
        this.previousTimestamp = timestamp;

        // Moves the balls in the ball box
        this.ballBox.animationStep(delta);

        // Draw!
        this.stage.drawOn(this.viewContext);

        // Request the next animation frame
        this.animationId = window.requestAnimationFrame(this.animationStep);
    }

    stopAnimation() {
        window.cancelAnimationFrame(this.animationId);
        this.animationId = null;
    }

    onInteraction (e) {
        e.stopPropagation();
        e.preventDefault();

        const positionSource = e.touches ? e.touches[0] : e;

        this.ballBox.propagateEvent('mousedown', [positionSource.pageX, positionSource.pageY]);
    }

    addBalls (eventType, position) {
        for (let i=0; i < 5; i++) {
            const newBall = new Ball(position[0], position[1]);

            const angle = Math.PI * Math.random();
            newBall.speedX =  400 * Math.cos(angle);
            newBall.speedY = -400 * Math.sin(angle);

            this.ballBox.addBall(newBall);
        }
    }
}

export default App;
