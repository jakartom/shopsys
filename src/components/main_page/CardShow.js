import React from 'react'
import { connect } from 'react-redux'
import { Button, Spin, message, Table, Input, InputNumber, Popconfirm, Form } from 'antd';
import { cardType_add, cardType_edit, cardType_query } from '../../redux/actions'
import '../Root.less';

const EditableContext = React.createContext();

class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `请输入 ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editingKey: '', count: 0 };
        this.columns = [
            {
                title: '会员卡名称',
                dataIndex: 'cardName',
                width: '80%',
                editable: true,
            },
            {
                title: '操作',
                dataIndex: 'oper',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span>
                            <EditableContext.Consumer>
                                {form => (<Popconfirm title="确认修改?" onConfirm={() => this.save(form, record.key)}>
                                    <Spin size="small" wrapperClassName="makeInline" spinning={this.props.phase === cardType_edit.types.REQUEST}> <a style={{ marginRight: 8 }} > 保存</a></Spin>
                                </Popconfirm>)
                                }

                            </EditableContext.Consumer>

                            <a
                                href="javascript:;"
                                onClick={() => this.cancel(record.key)}
                            >取消</a>

                        </span>
                    ) : (
                            <a disabled={editingKey !== ''} onClick={(e) => { this.edit(record.key); e.stopPropagation(); }}>
                                编辑
            </a>
                        );
                },
            },
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = (key) => {
        if (key && key.startsWith("NewRow")) {
            let i = 0;
            for (; i < this.state.data.length; i++) {
                if (this.state.data[i].key === key) break;
            }
            this.state.data.splice(i, 1);
            this.setState({ editingKey: '' });
        } else {
            this.setState({ editingKey: '' });
        }
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            if (key.startsWith("NewRow")) {
                this.props.requestAdd(row);
            } else {
                row.id = key;
                this.props.requestEdit(row);
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    handleAdd = () => {
        let cardArr = this.state.data;
        if (!cardArr) cardArr = [];
        let row = { key: "NewRow" + this.state.count };
        row.cardName = "";
        cardArr.push(row);
        this.setState({ data: cardArr, count: this.state.count + 1 });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.phase !== this.props.phase) {
            switch (this.props.phase) {
                case cardType_query.types.SUCCESS:
                    this.setState({ data: this.props.data, editingKey: '' });
                    break;
                case cardType_edit.types.SUCCESS:
                    this.setState({ data: this.props.data, editingKey: '' });
                    break;
                case cardType_edit.types.ERROR:
                    message.error("网络或系统错误,会员卡类型保存失败！");
                    break;
                default: ;
            }
        }
    }
    componentDidMount() {
        this.props.requestQuery();
    }
    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <React.Fragment>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增会员卡类型
                </Button>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.state.data}
                        columns={columns}
                        loading={this.props.phase === cardType_query.types.REQUEST}
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                </EditableContext.Provider>
            </React.Fragment>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);

function mapStateToProps(state) {
    let cardTypeData;
    if (state.cardType.data) cardTypeData = state.cardType.data.map(record => { record.key = record._id; return record });
    return { "phase": state.cardType.phase, data: cardTypeData };
}

export default connect(mapStateToProps, { requestEdit: cardType_edit.request, requestAdd: cardType_add.request, requestQuery: cardType_query.request })(EditableFormTable);