import { UPLOAD_AVATAR, USER_LOGIN, INIT, INIT_END, REQUEST, SUCCESS, FAILURE, ERROR, CANCEL } from '../actions'
export function user(state = { phase: "", }, action) {
    switch (action.type) {
        case USER_LOGIN[INIT]:
            return { phase: USER_LOGIN[INIT] };
        case USER_LOGIN[INIT_END]:
            return { phase: USER_LOGIN[INIT_END] };
        case USER_LOGIN[REQUEST]:
            return { phase: USER_LOGIN[REQUEST] };
        case USER_LOGIN[SUCCESS]:
            return { phase: USER_LOGIN[SUCCESS] };
        case USER_LOGIN[FAILURE]:
            return { phase: USER_LOGIN[FAILURE] };
        case USER_LOGIN[ERROR]:
            return { phase: USER_LOGIN[ERROR] };
        case USER_LOGIN[CANCEL]:
            return { phase: "" }
        case UPLOAD_AVATAR[REQUEST]:
            return { phase: UPLOAD_AVATAR[REQUEST] };
        case UPLOAD_AVATAR[SUCCESS]:
            return { phase: UPLOAD_AVATAR[SUCCESS] };
        case UPLOAD_AVATAR[ERROR]:
            return { phase: UPLOAD_AVATAR[ERROR] };
        default:
            return state;
    }
}

