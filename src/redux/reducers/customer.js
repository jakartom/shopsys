import { CUSTOMERQUERY_JOINPERMONTH, CUSTOMERQUERY_CARDFORAGE, CUSTOMERQUERY_CARDFORSEX, CUSTOMERQUERY_AGEFORCARD, CUSTOMERQUERY_SEXFORCARD, CUSTOMER_ADD, CUSTOMER_QUERY, CUSTOMER_DELETE, REQUEST, SUCCESS, ERROR, CUSTOMER_EDIT } from '../actions'
export function customer(state = { phase: "", }, action) {
    switch (action.type) {
        case CUSTOMER_ADD[REQUEST]:
            return { phase: CUSTOMER_ADD[REQUEST] };
        case CUSTOMER_ADD[SUCCESS]:
            return { phase: CUSTOMER_ADD[SUCCESS] };
        case CUSTOMER_ADD[ERROR]:
            return { phase: CUSTOMER_ADD[ERROR] };
        case CUSTOMER_QUERY[REQUEST]:
            let rt = { phase: CUSTOMER_QUERY[REQUEST], pagination: action.payload ? action.payload : {} };
            return rt;
        case CUSTOMER_QUERY[SUCCESS]:
            return { ...state, phase: CUSTOMER_QUERY[SUCCESS], pagination: action.payload };
        case CUSTOMER_QUERY[ERROR]:
            return { phase: CUSTOMER_QUERY[ERROR], message: "客户查询出错" };
        case CUSTOMER_DELETE[REQUEST]:
            return { ...state, phase: CUSTOMER_DELETE[REQUEST], deleteId: action.payload }
        case CUSTOMER_DELETE[SUCCESS]:
            return { ...state, phase: CUSTOMER_DELETE[SUCCESS] };
        case CUSTOMER_DELETE[ERROR]:
            return { ...state, phase: CUSTOMER_DELETE[ERROR] };
        case CUSTOMER_EDIT[REQUEST]:
            return { ...state, phase: CUSTOMER_EDIT[REQUEST] }
        case CUSTOMER_EDIT[SUCCESS]:
            return { ...state, phase: CUSTOMER_EDIT[SUCCESS] };
        case CUSTOMER_EDIT[ERROR]:
            return { ...state, phase: CUSTOMER_EDIT[ERROR] };
        case CUSTOMERQUERY_SEXFORCARD[REQUEST]:
            return { ...state, phase: CUSTOMERQUERY_SEXFORCARD[REQUEST] }
        case CUSTOMERQUERY_SEXFORCARD[SUCCESS]:
            return { ...state, phase: CUSTOMERQUERY_SEXFORCARD[SUCCESS], sexForCardData: action.payload };
        case CUSTOMERQUERY_SEXFORCARD[ERROR]:
            return { ...state, phase: CUSTOMERQUERY_SEXFORCARD[ERROR] };
        case CUSTOMERQUERY_AGEFORCARD[REQUEST]:
            return { ...state, phase: CUSTOMERQUERY_AGEFORCARD[REQUEST] }
        case CUSTOMERQUERY_AGEFORCARD[SUCCESS]:
            return { ...state, phase: CUSTOMERQUERY_AGEFORCARD[SUCCESS], ageForCardData: action.payload };
        case CUSTOMERQUERY_AGEFORCARD[ERROR]:
            return { ...state, phase: CUSTOMERQUERY_AGEFORCARD[ERROR] };
        case CUSTOMERQUERY_CARDFORSEX[REQUEST]:
            return { ...state, phase: CUSTOMERQUERY_CARDFORSEX[REQUEST] }
        case CUSTOMERQUERY_CARDFORSEX[SUCCESS]:
            return { ...state, phase: CUSTOMERQUERY_CARDFORSEX[SUCCESS], cardForSexData: action.payload };
        case CUSTOMERQUERY_CARDFORSEX[ERROR]:
            return { ...state, phase: CUSTOMERQUERY_CARDFORSEX[ERROR] };
        case CUSTOMERQUERY_CARDFORAGE[REQUEST]:
            return { ...state, phase: CUSTOMERQUERY_CARDFORAGE[REQUEST] }
        case CUSTOMERQUERY_CARDFORAGE[SUCCESS]:
            return { ...state, phase: CUSTOMERQUERY_CARDFORAGE[SUCCESS], cardForAgeData: action.payload };
        case CUSTOMERQUERY_CARDFORAGE[ERROR]:
            return { ...state, phase: CUSTOMERQUERY_CARDFORAGE[ERROR] };
        case CUSTOMERQUERY_JOINPERMONTH[REQUEST]:
            return { ...state, phase: CUSTOMERQUERY_JOINPERMONTH[REQUEST] }
        case CUSTOMERQUERY_JOINPERMONTH[SUCCESS]:
            return { ...state, phase: CUSTOMERQUERY_JOINPERMONTH[SUCCESS], joinPerMonthData: action.payload };
        case CUSTOMERQUERY_JOINPERMONTH[ERROR]:
            return { ...state, phase: CUSTOMERQUERY_JOINPERMONTH[ERROR] };
        default:
            return state;
    }
}

