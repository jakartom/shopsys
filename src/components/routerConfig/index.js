import React from 'react'
import { Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { Menu, Icon, Spin } from 'antd'
import Config from './config.js'
import Authorized from '../Authorize/Authorized'
const { SubMenu } = Menu;
function Loading(props) {
    if (props.error) {
        return <div>Error! <button>Retry</button></div>;
    } else if (props.timedOut) {
        return <div>Taking a long time... <button >Retry</button></div>;
    } else if (props.pastDelay) {
        return <Spin size="large" />;
    } else {
        return null;
    }
}

function createMenuItem(route, index, fatherIndex, menuRoutes) {
    let tempComponent = null;
    let rtIndex = index;
    if (fatherIndex >= 0) rtIndex = fatherIndex + "_" + rtIndex;
    menuRoutes[route.to] = rtIndex;
    //let openMenuWrapper = () => setOpenMenuFunc("sub" + fatherIndex, rtIndex);
    if (!route.auth) {
        tempComponent = <Link to={route.to}> <Icon type={route.icon} /> <span className="nav-text" >{route.desc}</span></Link >;
    } else {
        tempComponent = <Authorized auth={route.auth}>
            <Link to={route.to}> <Icon type={route.icon} /> <span className="nav-text" > {route.desc}</span></Link>
        </Authorized>;
    }

    return <Menu.Item key={rtIndex}>
        {tempComponent}
    </Menu.Item>
}


export default function getLinkOrRouter(prop, match, menuRoutes) {
    if (!prop || typeof prop !== 'string' || !Config[prop])
        return "";
    return Config[prop].map((route, index) => {
        if (route.type === "menu") {
            if (route.subs) {
                let subRouteArr = route.subs.map((subRoute, subIndex) => createMenuItem(subRoute, subIndex, index, menuRoutes));
                return <SubMenu key={"sub" + index}
                    title={
                        <span>
                            <Icon type={route.icon} />
                            <span>{route.desc}</span>
                        </span>
                    } >
                    {subRouteArr}
                </SubMenu>
            } else {
                return createMenuItem(route, index, undefined, menuRoutes);
            }
        } else {
            const LoadableCom = Loadable({
                loader: () => import(`../main_page/${route.component}`),
                loading: Loading,
                timeout: 1000
            });
            let urlAddr = "";
            if (!match) urlAddr = "";
            else urlAddr = match.url;
            if (route.auth) {
                return <Route path={urlAddr + route.path} key={index} render={props => (
                    <Authorized auth={route.auth}>
                        <LoadableCom />
                    </Authorized>
                )} />
            } else {
                return <Route path={urlAddr + route.path} key={index} component={LoadableCom} />
            }
        }
    });
}