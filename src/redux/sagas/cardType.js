import { call, take, put } from 'redux-saga/effects'
import { cardType_add, cardType_query, cardType_edit } from "../actions";
import { addCardType, getAllcardType, editCardType } from './pouchDB'

export function* watchCardTypeADD() {
    while (true) {
        try {
            const { payload } = yield take(cardType_add.types.REQUEST);
            yield call(addCardType, payload.cardName);
            yield put(cardType_add.success());
            yield put(cardType_query.request());
        } catch (error) {
            console.dir(error);
            yield put(cardType_add.error());
        }
    }
}


export function* watchCardTypeRequest() {
    while (true) {
        try {
            yield take(cardType_query.types.REQUEST);
            const result = yield call(getAllcardType);
            yield put(cardType_query.success(result));
        } catch (error) {
            console.dir(error);
            yield put(cardType_query.error());
        }
    }
}

export function* watchCardTypeEdit() {
    while (true) {
        try {
            const { payload } = yield take(cardType_edit.types.REQUEST);
            yield call(editCardType, payload.id, payload.cardName);
            yield put(cardType_edit.success());
            yield put(cardType_query.request());
        } catch (error) {
            console.dir(error);
            yield put(cardType_edit.error());
        }
    }
}