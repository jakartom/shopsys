import { CARDTYPE_ADD, CARDTYPE_QUERY, CARDTYPE_EDIT, REQUEST, SUCCESS, ERROR } from '../actions'
export function cardType(state = { phase: "", }, action) {
    switch (action.type) {
        case CARDTYPE_QUERY[REQUEST]:
            let rt = { ...state, phase: CARDTYPE_QUERY[REQUEST] };
            return rt;
        case CARDTYPE_QUERY[SUCCESS]:
            return { ...state, phase: CARDTYPE_QUERY[SUCCESS], data: action.payload };
        case CARDTYPE_QUERY[ERROR]:
            return { phase: CARDTYPE_QUERY[ERROR], message: "客户卡类型列表查询出错" };
        case CARDTYPE_EDIT[REQUEST]:
            return { ...state, phase: CARDTYPE_EDIT[REQUEST] };
        case CARDTYPE_EDIT[SUCCESS]:
            return { ...state, phase: CARDTYPE_EDIT[SUCCESS] };
        case CARDTYPE_EDIT[ERROR]:
            return { ...state, phase: CARDTYPE_EDIT[ERROR] };
        case CARDTYPE_ADD[REQUEST]:
            return { ...state, phase: CARDTYPE_ADD[REQUEST] };
        case CARDTYPE_ADD[SUCCESS]:
            return { ...state, phase: CARDTYPE_ADD[SUCCESS] };
        case CARDTYPE_ADD[ERROR]:
            return { ...state, phase: CARDTYPE_ADD[ERROR] };
        default:
            return state;
    }
}

