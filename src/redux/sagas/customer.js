import { select, take, put, call } from 'redux-saga/effects'
import { customerQuery_joinPerMonth, customerQuery_cardForAge, customerQuery_cardForSex, customerQuery_ageForCard, customerQuery_sexForCard, customer_add, customer_query, cardType_query, customer_edit, customer_delete } from '../actions'
import { getCustomerJoinPerMonth, getCustomerCardForAge, getCustomerCardForSex, getCustomerAgeForCard, getCustomerSexForCard, addCustomer, getCustomer, deleteCustomer, editCustomer } from './pouchDB'
import { getCustomerState } from './selectors'

export function* watchCustomerQuery() {
    while (true) {
        try {
            let { payload } = yield take(customer_query.types.REQUEST);
            const customerState = yield select(getCustomerState);
            let limit = 10;
            let skip = 0;
            if (!!payload.current) {
                skip = (payload.current - 1) * 10;
                customerState.pagination.current = payload.current;
            } else {
                limit = 0;
                yield put(cardType_query.request());
            }
            const result = yield call(getCustomer, skip, limit, payload.queryString);
            if (limit === 0) {
                //第一次查询
                payload.current = 1;
                payload.total = result.length;
            }
            payload.rtData = result;
            yield put(customer_query.success(payload));
        } catch (error) {
            console.dir(error);
            yield put(customer_query.error());
        }
    }
}

export function* watchCustomerDelete() {
    while (true) {
        try {
            const { payload } = yield take(customer_delete.types.REQUEST);
            const customerState = yield select(getCustomerState);
            yield call(deleteCustomer, payload);
            yield put(customer_delete.success());
            //重新刷新查询页面,加上查询条件是防止在查询框有输入时返回结果不对。
            customerState.pagination.total--;
            let current = customerState.pagination.total / 10;
            if (customerState.pagination.total % 10 > 0) current++;
            if (current < customerState.pagination.current)
                customerState.pagination.current = current;
            yield put(customer_query.request(customerState.pagination))
        } catch (error) {
            console.dir(error);
            yield put(customer_delete.error());
        }
    }
}

export function* watchCustomerEdit() {
    while (true) {
        try {
            const { payload } = yield take(customer_edit.types.REQUEST);
            const customerState = yield select(getCustomerState);
            yield call(editCustomer, payload);
            yield put(customer_edit.success());
            //重新刷新查询页面
            yield put(customer_query.request(customerState.pagination))
        } catch (error) {
            console.dir(error);
            yield put(customer_edit.error());
        }
    }
}

export function* watchCustomerAdd() {
    while (true) {
        try {
            const { payload } = yield take(customer_add.types.REQUEST);
            yield call(addCustomer, payload);
            yield put(customer_add.success());
        } catch (error) {
            console.dir(error);
            yield put(customer_add.error());
        }
    }
}

export function* watchCustomerQuery_sexForCard() {
    while (true) {
        try {
            const { payload } = yield take(customerQuery_sexForCard.types.REQUEST);
            const endArr = yield call(getCustomerSexForCard, payload);
            yield put(customerQuery_sexForCard.success(endArr));
        } catch (error) {
            console.dir(error);
            yield put(customerQuery_sexForCard.error());
        }
    }
}

export function* watchCustomerQuery_ageForCard() {
    while (true) {
        try {
            const { payload } = yield take(customerQuery_ageForCard.types.REQUEST);
            const endArr = yield call(getCustomerAgeForCard, payload);
            yield put(customerQuery_ageForCard.success(endArr));
        } catch (error) {
            console.dir(error);
            yield put(customerQuery_ageForCard.error());
        }
    }
}

export function* watchCustomerQuery_cardForSex() {
    while (true) {
        try {
            const { payload } = yield take(customerQuery_cardForSex.types.REQUEST);
            const endArr = yield call(getCustomerCardForSex, payload);
            yield put(customerQuery_cardForSex.success(endArr));
        } catch (error) {
            console.dir(error);
            yield put(customerQuery_cardForSex.error());
        }
    }
}

export function* watchCustomerQuery_cardForAge() {
    while (true) {
        try {
            const { payload } = yield take(customerQuery_cardForAge.types.REQUEST);
            const endArr = yield call(getCustomerCardForAge, payload);
            yield put(customerQuery_cardForAge.success(endArr));
        } catch (error) {
            console.dir(error);
            yield put(customerQuery_cardForAge.error());
        }
    }
}

export function* watchCustomerQuery_joinPerMonth() {
    while (true) {
        try {
            const { payload } = yield take(customerQuery_joinPerMonth.types.REQUEST);
            const endArr = yield call(getCustomerJoinPerMonth, payload);
            yield put(customerQuery_joinPerMonth.success(endArr));
        } catch (error) {
            console.dir(error);
            yield put(customerQuery_joinPerMonth.error());
        }
    }
}