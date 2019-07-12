import { put, call, fork, all } from 'redux-saga/effects'
import { watchLoginFlow } from './user'
import { watchCustomerQuery_joinPerMonth, watchCustomerQuery_cardForAge, watchCustomerQuery_cardForSex, watchCustomerQuery_ageForCard, watchCustomerQuery_sexForCard, watchCustomerQuery, watchCustomerDelete, watchCustomerEdit, watchCustomerAdd } from './customer'
import { watchCardTypeADD, watchCardTypeRequest, watchCardTypeEdit } from './cardType'
import { watchUploadAvatarRequest } from './user'
import { dbInit } from './pouchDB'
import { user_login } from '../actions'

export default function* root() {
    if (!sessionStorage.getItem("auth")) {
        try {
            //用户未登陆
            yield put(user_login.init());
            yield call(dbInit);
            yield put(user_login.initEnd())
        } catch (error) {
            console.dir(error);
            yield put(user_login.error());
        }
    } else {
        //用户已经登陆，目前是刷新页面
        yield put(user_login.initEnd())
    }
    yield all([
        fork(watchLoginFlow),
        fork(watchUploadAvatarRequest),
        fork(watchCustomerAdd),
        fork(watchCustomerQuery),
        fork(watchCustomerEdit),
        fork(watchCustomerDelete),
        fork(watchCustomerQuery_sexForCard),
        fork(watchCustomerQuery_ageForCard),
        fork(watchCustomerQuery_cardForSex),
        fork(watchCustomerQuery_cardForAge),
        fork(watchCustomerQuery_joinPerMonth),
        fork(watchCardTypeADD),
        fork(watchCardTypeRequest),
        fork(watchCardTypeEdit),
    ])
}
