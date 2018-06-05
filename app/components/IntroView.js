import { Container } from '../lightpixel';
import OutlineText from './OutlineText';
import IntroButton from './IntroButton';
import { INTRO_TITLE_FONT_SIZE } from '../config';

class IntroView extends Container {
    constructor() {
        super();

        this.title = new OutlineText('JUGLR', INTRO_TITLE_FONT_SIZE);
        this.title.interactive = false;
        this.title.y = -200;

        this.playButton = new IntroButton('PLAY');
        this.playButton.y = 15;
        this.playButton.on('mousedown', () => console.log('play'));

        this.settingsButton = new IntroButton('SETTINGS');
        this.settingsButton.y = 105;
        this.settingsButton.on('mousedown', () => console.log('settings'));

        this.aboutButton = new IntroButton('ABOUT');
        this.aboutButton.y = 195;
        this.aboutButton.on('mousedown', () => console.log('about'));

        this.addChild(this.title);
        this.addChild(this.playButton);
        this.addChild(this.settingsButton);
        this.addChild(this.aboutButton);
    }
}

export default IntroView;
