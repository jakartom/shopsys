import React from 'react'
import { Layout, Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import getLinkOrRouter from './routerConfig'
import './Root.less';
import logoImg from './img/card.svg';
import AvatarDropDownMenu from './main_page/AvatarDropDownMenu'
const { Header, Content, Footer, Sider } = Layout;

export default class RootApp extends React.Component {
    state = {
        collapsed: false,
        subMenuOpenKeys: [],
        menuItemSelectedKeys: [],
        avatarModalVisible: false,
    };
    menuRoutes = {};
    setOpenMenu = (subMenuKey, menuItemKey) => {
        let a = [];
        a.push(subMenuKey);
        let b = [];
        b.push(menuItemKey);
        this.setState({
            ...this.state,
            subMenuOpenKeys: a,
            menuItemSelectedKeys: b,
        })
    };

    toggle = () => {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed,
        });
    };
    componentWillMount() {
        let t = sessionStorage.getItem("menuRoutes");
        if (t) {

            this.menuRoutes = JSON.parse(t);
            let menuIndex = "" + this.menuRoutes[this.props.history.location.pathname];
            if (menuIndex) {
                let indexArr = menuIndex.split("_");
                if (indexArr.length === 2) {
                    this.setOpenMenu("sub" + indexArr[0], menuIndex);
                } else {
                    this.setOpenMenu(undefined, menuIndex);
                }
            }
        }
    }
    componentDidMount() {
        sessionStorage.setItem("menuRoutes", JSON.stringify(this.menuRoutes));

    }

    render() {
        return (<Layout >
            <Sider breakpoint="lg"
                collapsedWidth="0"
                trigger={null}
                collapsible collapsed={this.state.collapsed}
                style={{ minHeight: '100vh', color: 'white' }}
                onBreakpoint={
                    broken => {
                    }
                }
                onCollapse={
                    (collapsed, type) => {
                    }
                } >
                <div className="rootLogo">
                    <Link to="/">
                        <img src={logoImg} alt="logo" />
                        <h1>门店系统</h1>
                    </Link>
                </div>
                <Menu theme="dark" mode="inline"
                    defaultOpenKeys={this.state.subMenuOpenKeys}
                    defaultSelectedKeys={this.state.menuItemSelectedKeys}>
                    {getLinkOrRouter("sideBar", undefined, this.menuRoutes)}
                </Menu>
            </Sider>
            <Layout>
                <Header style={
                    {
                        background: '#fff',
                        padding: 0
                    }
                }>
                    <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <div className="right" id="headerRight">
                        <AvatarDropDownMenu history={this.props.history} />
                    </div>
                </Header>
                <Content style={
                    {
                        margin: '24px 16px 0'
                    }
                } >
                    <div style={
                        {
                            padding: 24,
                            background: '#fff',
                            minHeight: '100%'
                        }
                    } >
                        {getLinkOrRouter("content", this.props.match)}
                    </div>
                </Content>
                <Footer style={
                    {
                        textAlign: 'center'
                    }
                } > Created by jakartom
                 </Footer>
            </Layout>
        </Layout >
        );
    }
}

