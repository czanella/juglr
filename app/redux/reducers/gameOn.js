import {
    START_GAME,
    END_GAME,
} from '../actions';

function gameOn(state = false, action) {
    let newState;

    switch (action.type) {
        case START_GAME:
            newState = true;
            break;

        case END_GAME:
            newState = false;
            break;

        default:
            newState = state;
            break;
    }

    return newState;
}

export default gameOn;
