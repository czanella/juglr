import {
    Container,
    Sprite
} from '../lightpixel';

import { TweenLite, Quad } from 'gsap';

class Bunny extends Container {
    constructor(bunnyTexture) {
        super();

        this.bunny = new Sprite(bunnyTexture);

        this.bunny.y = -33;
        this.bunny.anchorX = 0.5;
        this.bunny.anchorY = 1.0;
        this.bunny.buildHitMask();

        this.addChild(this.bunny);

        this._rotationY = 0;

        this.onHit = this.onHit.bind(this);

        this.on('mousedown', this.onHit);
    }

    get rotationY () {
        return this._rotationY;
    }

    set rotationY (value) {
        this._rotationY = value;
        this.bunny.scaleX = Math.cos(value);
    }

    onHit () {
        TweenLite.fromTo(this, 2, 
            {
                rotationY: 4 * 2 * Math.PI
            },
            {
                rotationY: 0,
                ease: Quad.easeOut
            }
        );
    }
}

export default Bunny;
