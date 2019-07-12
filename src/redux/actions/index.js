export const INIT = "INIT"
export const INIT_END = "INIT_END"
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'
export const ERROR = "ERROR"
export const CANCEL = "CANCEL"

function createRequestTypes(base) {
    return [INIT, INIT_END, REQUEST, SUCCESS, FAILURE, ERROR, CANCEL].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}

export const USER_LOGIN = createRequestTypes('USER_LOGIN')
export const UPLOAD_AVATAR = createRequestTypes("UPLOAD_AVATAR");
export const CUSTOMER_ADD = createRequestTypes("CUSTOMER_ADD")
export const CUSTOMER_QUERY = createRequestTypes("CUSTOMER_QUERY");
export const CUSTOMER_EDIT = createRequestTypes("CUSTOMER_EDIT");
export const CUSTOMER_DELETE = createRequestTypes("CUSTOMER_DELETE");
export const CUSTOMERQUERY_SEXFORCARD = createRequestTypes("CUSTOMERQUERY_SEXFORCARD");
export const CUSTOMERQUERY_AGEFORCARD = createRequestTypes("CUSTOMERQUERY_AGEFORCARD");
export const CUSTOMERQUERY_CARDFORSEX = createRequestTypes("CUSTOMERQUERY_CARDFORSEX");
export const CUSTOMERQUERY_CARDFORAGE = createRequestTypes("CUSTOMERQUERY_CARDFORAGE");
export const CUSTOMERQUERY_JOINPERMONTH = createRequestTypes("CUSTOMERQUERY_JOINPERMONTH");
export const CARDTYPE_ADD = createRequestTypes("CARDTYPE_ADD");
export const CARDTYPE_QUERY = createRequestTypes("CARDTYPE_QUERY");
export const CARDTYPE_EDIT = createRequestTypes("CARDTYPE_EDIT");

function action(type, payload = {}) {
    return { type, payload };
}

const createActionCreator = types => {
    return {
        types: types,
        init: () => action(types[INIT]),
        initEnd: () => action(types[INIT_END]),
        request: payload => action(types[REQUEST], payload),
        success: payload => action(types[SUCCESS], payload),
        failure: () => action(types[FAILURE]),
        error: () => action(types[ERROR]),
        cancel: () => action(types[CANCEL]),
    }
};

export const user_login = createActionCreator(USER_LOGIN);
export const upload_avatar = createActionCreator(UPLOAD_AVATAR);
export const customer_add = createActionCreator(CUSTOMER_ADD);
export const customer_query = createActionCreator(CUSTOMER_QUERY);
export const customer_edit = createActionCreator(CUSTOMER_EDIT);
export const customer_delete = createActionCreator(CUSTOMER_DELETE);
export const customerQuery_sexForCard = createActionCreator(CUSTOMERQUERY_SEXFORCARD);
export const customerQuery_ageForCard = createActionCreator(CUSTOMERQUERY_AGEFORCARD);
export const customerQuery_cardForSex = createActionCreator(CUSTOMERQUERY_CARDFORSEX);
export const customerQuery_cardForAge = createActionCreator(CUSTOMERQUERY_CARDFORAGE);
export const customerQuery_joinPerMonth = createActionCreator(CUSTOMERQUERY_JOINPERMONTH);
export const cardType_add = createActionCreator(CARDTYPE_ADD);
export const cardType_query = createActionCreator(CARDTYPE_QUERY);
export const cardType_edit = createActionCreator(CARDTYPE_EDIT);
