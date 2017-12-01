import store from './redux/store';
import { START_GAME } from './redux/actions';
import { Sprite, Container, Mask } from './lightpixel';
import { Ball, BallBox, OutlineText } from './components';
import { Game } from './controllers';
import { GRAVITY } from './config.json';

class App {
    constructor(width = 300, height = 480, view = null) {
        // Initializes the game view (canvas)
        this.view = view || document.createElement('canvas');
        this.view.width = width;
        this.view.height = height;
        this.viewContext = this.view.getContext('2d');

        // Method bindings
        this.animationStep = this.animationStep.bind(this);
        this.onInteraction = this.onInteraction.bind(this);

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
        this.ballBox = new BallBox(this.view.width, this.view.height, 0, GRAVITY);

        // Builds the scoreboard
        this.scoreView = new OutlineText('Eita', 80);
        this.scoreView.x = this.view.width / 2;
        this.scoreView.y = this.view.height / 2;

        // Builds the stage
        this.stage = new Container();
        this.stage.addChild(this.ballBox);
        this.stage.addChild(this.scoreView);

        // Starts the game
        this.gameController = new Game(this.ballBox, this.scoreView);
        store.dispatch(START_GAME);

        this.startAnimation();
    }

    startAnimation() {
        this.stopAnimation();
        this.animationId = window.requestAnimationFrame(this.animationStep);
    }

    animationStep(timestamp) {
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

        this.stage.propagateEvent('mousedown', [positionSource.pageX, positionSource.pageY]);
    }
}

export default App;
