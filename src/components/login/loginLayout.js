import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import './loginLayout.less';
import logoImg from '../img/card.svg';

export default class LoginLayout extends Component {

    render() {
        const {
            children,
        } = this.props;
        return (
            <DocumentTitle title="登陆系统">
                <div className="container">
                    <div className="content">
                        <div className="top">
                            <div className="header">
                                <img alt="logo" className="logo" src={logoImg} />
                                <span className="title">门店卡品管理系统</span>
                            </div>
                            <div className="desc">欢迎登陆！</div>
                        </div>
                        {children}
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}

