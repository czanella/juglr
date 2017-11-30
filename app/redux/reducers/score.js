import {
    INCREASE_SCORE,
    RESET_SCORE,
} from '../actions';

function score(state = 0, action) {
    let newState;

    switch (action.type) {
        case INCREASE_SCORE:
            newState = state + 1;
            break;

        case RESET_SCORE:
            newState = 0;
            break;

        default:
            newState = state;
            break;
    }

    return newState;
}

export default score;
