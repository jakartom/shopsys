import React from 'react'
import { connect } from 'react-redux'
import { Input, Table, Divider, Modal } from 'antd';
import { jsGetAge } from '../util'
import CustomerEditModal from './CustomerEditModal'
import { customer_query, customer_edit, customer_delete }
    from '../../redux/actions'

const confirm = Modal.confirm;
const { Search } = Input;
class CustomerShow extends React.Component {
    state = {
        visible: false,
    };
    columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            width: '8%',
        },
        {
            title: '会员类型',
            dataIndex: 'cardName',
            width: '10%'
        },
        {
            title: '成为会员时间(年)',
            dataIndex: 'joinDate',
            render: joinDate => {
                if (joinDate) return jsGetAge(joinDate);
                else return joinDate;
            },
            width: '10%'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            width: '8%',
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            width: '14%'
        },
        {
            title: '籍贯',
            dataIndex: 'city',
            width: '30%',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a onClick={this.showModal.bind(this, record)}>编辑</a>
                    <Divider type="vertical" />
                    <a onClick={this.handleDelete.bind(this, record._id, record.name)}>删除</a>
                </span>
            ),
            width: '20%',
        },
    ];
    componentDidMount() {
        this.props.request();
    }

    handleTableChange = (pagination, filters, sorter) => {
        pagination.queryString = this.state.queryString;
        this.props.request(pagination)
    };
    handleDelete = function (id, name, e) {
        const that = this;
        confirm({
            title: '删除确认',
            content: '确定删除 ' + name + '?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                that.props.delete(id);
                //e.preventDefault();
            },
            onCancel() {
            },
        });
    }

    handleSearch = value => {
        this.setState({
            ...this.state,
            queryString: value
        });
        this.props.request({ queryString: value });
    }
    showModal = (record, e) => {
        this.setState({
            record,
            visible: true
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleSave = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.birthday = values["birthday"].format("YYYY-MM-DD");
            values.joinDate = values["joinDate"].format("YYYY-MM-DD");
            values.city = values.city.join(" ");
            values.cardType = values.cardType * 1;
            values._id = this.state.record._id;

            //form.resetFields();
            this.props.edit(values);
            // this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return <React.Fragment>
            <Search
                placeholder="请输入客户姓名"
                enterButton="查询"
                onSearch={this.handleSearch}
                style={{ width: 300 }}
            />
            <Table
                columns={this.columns}
                rowKey={record => record._id}
                dataSource={this.props.data}
                pagination={this.props.pagination}
                loading={this.props.phase === customer_query.types.REQUEST
                    || this.props.phase === customer_edit.types.REQUEST
                    || this.props.phase === customer_delete.types.REQUEST}
                onChange={this.handleTableChange}
            />
            <CustomerEditModal
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                record={this.state.record}
                onCancel={this.handleCancel}
                onSave={this.handleSave}
            />
        </React.Fragment>;
    }
}
function mapStateToProps(state) {
    let rtData = state.customer.pagination ? state.customer.pagination.rtData : undefined;
    return {
        "phase": state.customer.phase,
        "data": rtData,
        "pagination": state.customer.pagination,
    };
}
export default connect(mapStateToProps, { request: customer_query.request, delete: customer_delete.request, edit: customer_edit.request })(CustomerShow);