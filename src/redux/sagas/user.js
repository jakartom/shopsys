import { take, put, call } from 'redux-saga/effects'
import { user_login, upload_avatar } from '../actions'
import { getUser, saveAvatar } from './pouchDB'
import { CookieUtil } from '../../components/util'

export function* watchLoginFlow() {
    while (true) {
        try {
            const { payload } = yield take(user_login.types.REQUEST);
            const cookieUserName = CookieUtil.get("username");
            const cookiePassword = CookieUtil.get("password");
            let userName = payload.username;
            if (!userName) userName = cookieUserName;
            const doc = yield call(getUser, userName);
            if (doc && (doc.password === payload.password || doc.password === cookiePassword)) {
                if (payload.remember) {
                    let d = new Date();
                    d.setFullYear(d.getFullYear() + 1);
                    CookieUtil.set("username", doc.username, d);
                    CookieUtil.set("password", doc.password, d);
                } else {
                    CookieUtil.unset("username");
                    CookieUtil.unset("password");
                }
                sessionStorage.setItem("auth", doc.auth);
                sessionStorage.setItem("id", doc._id);
                sessionStorage.setItem("username", doc.username);
                if (doc.avatar) {
                    sessionStorage.setItem("avatar", "data:" + doc.avatarFileType + ";base64," + doc.avatar);
                }
                yield put(user_login.success());
            }
            else yield put(user_login.failure());
        } catch (error) {
            console.dir(error);
            yield put(user_login.error())
        }
    }
}

export function* watchUploadAvatarRequest() {
    while (true) {
        try {
            const { payload } = yield take(upload_avatar.types.REQUEST);
            yield call(saveAvatar, payload.id, payload.img, payload.fileName, payload.fileType);
            sessionStorage.setItem("avatar", "data:" + payload.fileType + ";base64," + payload.img)
            yield put(upload_avatar.success());
        } catch (error) {
            console.dir(error);
            yield put(upload_avatar.error());
        }
    }
}