import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Root from './components/Root'
import configureStore from './redux/store'
import rootSaga from './redux/sagas'
import { Spin} from 'antd'
import { user_login } from './redux/actions'
import Authorized from './components/Authorize/Authorized'
import LoginPage from './components/login'

const store = configureStore(window.__INITIAL_STATE__)
store.runSaga(rootSaga)

class App extends React.Component {
    componentWillMount() {
        // loading 动画 的结束 控制 模块
        let loading = document.getElementById('loading')
        if (loading) {
            setTimeout(() => {
                loading.style.display = 'none'
            }, 300)
        }
    }

    render() {
        return <Spin spinning={this.props.phase === (user_login.init()).type} delay={500} tip="数据库初始化中..." >
            <Router>
                <Switch>
                    <Route path="/login" exact component={LoginPage} />
                    <Authorized auth={["guest", "admin"]}> <Route path="/" component={Root} /></Authorized>
                </Switch>
            </Router>
        </Spin>
    }


}

function mapStateToProps(state) {
    return { "phase": state.user.phase };
}

const ConnectedApp = connect(mapStateToProps, null)(App);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
