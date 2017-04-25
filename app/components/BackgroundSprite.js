import { Sprite } from '../lightpixel';

class BackgroundSprite extends Sprite {
    drawOn (context) {
        const cWidth = context.canvas.width;
        const cHeight = context.canvas.height;

        this.x = cWidth / 2;
        this.y = cHeight / 2;

        this.scale = Math.max(
            cWidth / this.texture.width,
            cHeight / this.texture.height,
        );

        super.drawOn(context);
    }
}

export default BackgroundSprite;
