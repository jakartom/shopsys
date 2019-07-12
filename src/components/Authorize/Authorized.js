import checkPermission from './CheckPermission'
import Exception from '../Exception'
import React from 'react'
import { Redirect } from 'react-router-dom'

export default class Authorized extends React.Component {

    render() {
        const currentAuth = sessionStorage.getItem("auth");
        let loginStatus = true;
        if (!currentAuth || currentAuth === "") loginStatus = false;
        if (loginStatus) {
            if (checkPermission(currentAuth, this.props.auth)) {
                return this.props.children;
            }
            else {
                return <Exception type="403" />;
            }
        } else {
            // this.loginPage = <LoginPage />;
            return <Redirect to="/login" />;
        }
    }

}

