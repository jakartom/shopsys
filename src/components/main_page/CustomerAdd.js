import React from 'react'
import { connect } from 'react-redux'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { Spin, Button, DatePicker, Cascader, message, Select, Form, Input, Radio } from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import { customer_add, cardType_query } from '../../redux/actions'
import areaData from './newCity.json'

moment.locale('zh-cn');
const { Option } = Select;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line

    class extends React.Component {

        constructor(props) {
            super(props);
            this.closeFunc = null;
            this.state = { optionData: [] }
        }
        componentDidMount() {
            this.props.cardTypeRequest();
        }
        componentDidUpdate(prevProps) {
            if (prevProps.phase !== this.props.phase) {
                switch (this.props.phase) {
                    case customer_add.types.REQUEST:
                        if (this.closeFunc) this.closeFunc();
                        this.closeFunc = message.loading("正在新增客户信息...", 0);
                        break;
                    case customer_add.types.SUCCESS:
                        if (this.closeFunc) this.closeFunc();
                        this.closeFunc = message.success("客户新增成功");
                        this.props.form.resetFields();
                        break;
                    case customer_add.types.ERROR:
                        if (this.closeFunc) this.closeFunc();
                        this.closeFunc = message.error("网络或系统错误,客户新增失败！");
                        break;
                    default: ;
                }
            }
            if (prevProps.cardTypePhase !== this.props.cardTypePhase) {
                if (this.props.cardTypePhase === cardType_query.types.ERROR) {
                    message.error("网络或系统错误,会员卡类型获取失败！");
                } else if (this.props.cardTypePhase === cardType_query.types.SUCCESS) {
                    this.setState({
                        ...this.state,
                        optionData:
                            this.props.optionData.map((doc) => {
                                doc.value = doc.typeId;
                                doc.text = doc.cardName;
                                return doc;
                            })
                    });
                }
            }
        }
        handleSubmit = e => {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    values.birthday = values["birthday"].format("YYYY-MM-DD");
                    values.joinDate = values["joinDate"].format("YYYY-MM-DD");
                    values.city = values.city.join(" ");
                    this.props.request(values);
                }
            });
        };
        render() {
            const { getFieldDecorator } = this.props.form;
            const formItemLayout =
            {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
            };

            const buttonItemLayout =
            {
                wrapperCol: { span: 14, offset: 4 },
            };
            return (
                <Spin
                    tip="加载会员卡类型..."
                    spinning={this.props.cardTypePhase === cardType_query.types.REQUEST}
                >
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                        <Form.Item label="姓名" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入用户姓名!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="会员级别" {...formItemLayout}>
                            {getFieldDecorator('cardType', {
                                rules: [{ required: true, message: '请选择用户级别!' }],
                            })(<Select
                                placeholder="选择会员卡类型"
                                filterOption={false}
                                style={{ width: '100%' }}
                            >
                                {this.state.optionData.map(d => (
                                    <Option key={d.value}>{d.text}</Option>
                                ))}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="加入会员时间" {...formItemLayout}>
                            {getFieldDecorator('joinDate', {
                                rules: [{ required: true, message: '请输入用户加入会员时间!' }],
                            })(<DatePicker size='default' locale={locale} />)}
                        </Form.Item>
                        <Form.Item label="性别" {...formItemLayout}>
                            {getFieldDecorator('sex', {
                                rules: [{ required: true, message: '请选择用户性别!' }],
                            })(
                                <Radio.Group>
                                    <Radio value="男">男</Radio>
                                    <Radio value="女">女</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="生日" {...formItemLayout}>
                            {getFieldDecorator('birthday', {
                                rules: [{ required: true, message: '请输入用户生日!' }],
                            })(<DatePicker size='default' locale={locale} />)}
                        </Form.Item>
                        <Form.Item label="籍贯" {...formItemLayout}>
                            {getFieldDecorator('city', {
                                rules: [
                                    { type: 'array', required: true, message: '请选择用户籍贯！' }],
                            })(<Cascader options={areaData} />)}
                        </Form.Item>
                        <Form.Item {...buttonItemLayout}>
                            <Button type="primary" htmlType="submit">新增</Button>
                        </Form.Item>
                    </Form>
                </Spin>
            );
        }
    },
);

function mapStateToProps(state) {
    return { "phase": state.customer.phase, "cardTypePhase": state.cardType.phase, optionData: state.cardType.data };
}

export default connect(mapStateToProps, { cardTypeRequest: cardType_query.request, request: customer_add.request })(CollectionCreateForm);