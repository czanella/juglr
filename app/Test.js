import createjs from 'preload-js'
import { Sprite } from './lightpixel';

class Test {
    constructor() {
        this.onLoadingComplete = this.onLoadingComplete.bind(this);
        this.animationStep = this.animationStep.bind(this);

        this.view = document.createElement('canvas');
        this.view.width = 640;
        this.view.height = 960;

        this.viewContext = this.view.getContext('2d');

        this.preloader = new createjs.LoadQueue();
        this.preloader.on('complete', this.onLoadingComplete);
        this.preloader.loadManifest([
            {
                id: 'bunny',
                src:'static/bunny.png'
            },
        ]);
    }

    onLoadingComplete() {
        window.requestAnimationFrame(this.animationStep);
        this.bunny = new Sprite(this.preloader.getResult('bunny'));
        this.bunny.x = 0;
        this.bunny.y = this.view.height / 2;
        this.bunny.scale = 3;
    }

    animationStep() {
        this.bunny.x = (this.bunny.x + 10) % this.view.width;
        this.bunny.y = this.view.height / 2 + 100 * Math.sin(this.bunny.x / 100);

        this.viewContext.globalCompositeOperation = 'destination-in';
        this.viewContext.globalAlpha = 0.9;
        this.viewContext.fillRect(0, 0, this.view.width, this.view.height);

        this.viewContext.globalCompositeOperation = 'source-over';
        this.viewContext.globalAlpha = 1;
        this.bunny.drawOn(this.viewContext);

        window.requestAnimationFrame(this.animationStep);
    }
}

export default Test;
