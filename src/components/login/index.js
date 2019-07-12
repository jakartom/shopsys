import React from 'react'
import { connect } from 'react-redux'
import { user_login } from '../../redux/actions'
import { message } from 'antd'
import LoginLayout from './loginLayout'
import LoginForm from './loginContent'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.closeFunc = null;
    }


    componentDidUpdate(prevProps) {
        if (prevProps.phase !== this.props.phase) {


            switch (this.props.phase) {
                case user_login.types.REQUEST:
                    if (this.closeFunc) this.closeFunc();
                    this.closeFunc = message.loading("正在登陆系统...", 0);
                    break;
                case user_login.types.SUCCESS:

                    if (this.closeFunc) this.closeFunc();
                    this.closeFunc = message.success("登陆成功");
                    this.props.history.replace("/");
                    // this.props.confirm();
                    break;
                case user_login.types.FAILURE:
                    if (this.closeFunc) this.closeFunc();
                    this.closeFunc = message.error("用户名或密码错误");
                    break;
                case user_login.types.ERROR:
                    if (this.closeFunc) this.closeFunc();
                    this.closeFunc = message.error("网络或系统错误！");
                    break;
                default: ;
            }
        }
    }
    render() {
        return <LoginLayout>
            <LoginForm request={this.props.request} />
        </LoginLayout>
    }
}
function mapStateToProps(state) {
    return { "phase": state.user.phase };
}

export default connect(mapStateToProps, { request: user_login.request })(LoginPage);