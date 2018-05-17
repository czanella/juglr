import { TweenLite, Back } from 'gsap';

import { Container } from '../lightpixel';
import { randomPick } from '../utils';


const neutralPosition = {
    scaleY: 1,
    scaleY: 1,
    rotation: 0,
    x: 0,
}

const Squash = {
    to: {
        scaleY: 0,
        scaleX: 2,
    },
    forwardEase: { ease: Back.easeIn },
    backwardEase: { ease: Back.easeOut },
};

const Fan = {
    to: {
        rotation: 2 * Math.PI,
        scaleX: 0,
        scaleY: 0,
    },
    forwardEase: { ease: Back.easeIn },
    backwardEase: { ease: Back.easeOut },
};

function buildTransition(method) {
    const to = Object.assign({}, neutral, method.to);
    return (target, duration, delay, isForward, isFromTo, onComplete = null) => {
        let start, end;
        if (isForward) {
            start = neutral;
            end = Object.assign({}, to, method.forwardEase, { onComplete });
        } else {
            start = to;
            end = Object.assign({}, neutral, method.backwardEase, { onComplete });
        }

        let tween;
        if (isFromTo) {
            tween = TweenLite.fromTo(target, duration, start, end);
        } else {
            tween = TweenLite.to(target, duration, end);
        }

        return tween;
    };
}

const transitions = [
    Squash,
    Fan,
].map(buildTransition);

class MenuView extends Container {
    constructor() {
        super();

        this.itemTweens = [];
    }

    killItemTweens() {
        this.itemTweens.forEach(it => it.kill());
        this.itemTweens = [];
    }

    animateItems(isHiding) {
        const isFromTo = this.itemTweens.length === 0;
        this.killItemTweens();

        return new Promise((resolve) => {
            this.children.forEach((child, index) => {
                const onComplete = index === this.children.length - 1 ? resolve : null;
                const transition = randomPick(transitions);

                this.itemTweens.push(transition(
                    child,
                    500,
                    index * 200,
                    isHiding,
                    isFromTo,
                    onComplete,
                ));
            });
        });
    }

    hideItems() {
        this.animateItems(true);
    }

    showItems() {
        this.animateItems(false);
    }
}
