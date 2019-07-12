
import React from 'react'
import { Typography, Dropdown, Avatar, Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { revokeObjectURL } from '../util'
import '../Root.less';
import AvatarChangeModal from './AvatarChangeModal'
const { Text } = Typography;

class AvatarDropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { avatarModalVisible: false };
    }
    handleClick = e => {
        if (e.key === "logout") {
            sessionStorage.removeItem("auth");
            revokeObjectURL(sessionStorage.getItem("avatar"));
            sessionStorage.removeItem("avatar");
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("id");
            this.props.history.replace("/");
        } else if (e.key === "usersetting") {
            this.setState({
                avatarModalVisible: true
            })
        }
    };

    avatarModalOnCancel = () => {
        this.setState({
            avatarModalVisible: false
        })
    }
    render() {
        const menu = (
            <Menu className="menu" selectedKeys={[]} onClick={this.handleClick}>
                <Menu.Item key="usersetting">
                    <Icon type="setting" />
                    更换头像
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    退出系统
                </Menu.Item>
            </Menu>
        );
        return <React.Fragment>
            <Dropdown overlayClassName="menuContainer" overlay={menu} >
                <span className="action account">
                    {
                        sessionStorage.getItem("avatar") ? (
                            <Avatar className="avatar" size={54} src={sessionStorage.getItem("avatar")} />
                        ) : (<Avatar className="avatar" size={54} icon="user" />)
                    }
                    <Text strong>{sessionStorage.getItem("username")}</Text>

                </span>
            </Dropdown>
            <AvatarChangeModal
                visible={this.state.avatarModalVisible}
                onCancel={this.avatarModalOnCancel}
            />
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return { "phase": state.user.phase };
}

export default connect(mapStateToProps, null)(AvatarDropDownMenu);