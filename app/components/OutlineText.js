import { Container, TextNode } from '../lightpixel';

class OutlineText extends Container {
    constructor(text = '', size = 20) {
        super();

        this.red = new TextNode(
            text,
            size,
            '#ff0000',
            'LCD Solid',
            'center',
            'middle',
            10
        );

        this.black = new TextNode(
            text,
            size,
            '#000000',
            'LCD Solid',
            'center',
            'middle',
            4
        );

        this.white = new TextNode(
            text,
            size,
            '#ffffff',
            'LCD Solid',
            'center',
            'middle'
        );

        this.addChild(this.red);
        this.addChild(this.black);
        this.addChild(this.white);
    }

    set text(value) {
        this.red.text = value;
        this.black.text = value;
        this.white.text = value;
    }
}

export default OutlineText;
