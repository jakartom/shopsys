import React from 'react'
import { connect } from 'react-redux'
import locale from 'antd/lib/date-picker/locale/zh_CN';
import { DatePicker, Cascader, message, Select, Modal, Form, Input, Radio } from 'antd';
import moment from 'moment'
import 'moment/locale/zh-cn';
import { customer_query, customer_edit } from '../../redux/actions'
import areaData from './newCity.json'

moment.locale('zh-cn');
const { Option } = Select;
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line

    class extends React.Component {

        constructor(props) {
            super(props);
            this.closeFunc = null;
        }

        componentDidUpdate(prevProps) {
            if (prevProps.phase !== this.props.phase) {
                switch (this.props.phase) {
                    case customer_edit.types.REQUEST:
                        if (this.closeFunc) this.closeFunc();
                        this.closeFunc = message.loading("正在更新客户信息...", 0);
                        break;
                    case customer_edit.types.SUCCESS:
                        if (this.closeFunc) this.closeFunc();
                        this.closeFunc = message.success("客户更新成功");
                        this.props.onCancel();
                        // this.props.request();
                        break;
                    case customer_edit.types.ERROR:
                        if (this.closeFunc) this.closeFunc();
                        this.closeFunc = message.error("网络或系统错误,客户更新失败！");
                        break;
                    default: ;
                }
            }
        }
        render() {
            const { record, visible, onCancel, onSave, form } = this.props;
            const { getFieldDecorator } = form;
            let cityArr = [];
            if (record && record.city) {
                cityArr = record.city.split(" ");
            }
            let optionData = this.props.optionData;
            if (!optionData) optionData = [];
            optionData = optionData.map((doc) => {
                doc.value = doc.typeId;
                doc.text = doc.cardName;
                return doc;
            });
            return (
                <Modal
                    visible={visible}
                    title="客户属性修改"
                    okText="保存"
                    cancelText="取消"
                    onCancel={onCancel}
                    onOk={onSave}
                    destroyOnClose={true}
                >
                    <Form layout="vertical">
                        <Form.Item label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入用户姓名!' }],
                                initialValue: record ? record.name : "",
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="会员级别">
                            {getFieldDecorator('cardType', {
                                rules: [{ required: true, message: '请选择用户级别!' }],
                                initialValue: record ? "" + record.cardType : "",
                            })(<Select
                                placeholder="Select users"
                                filterOption={false}
                                style={{ width: '100%' }}
                            >
                                {optionData.map(d => (
                                    <Option key={d.value}>{d.text}</Option>
                                ))}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label="加入会员时间">
                            {getFieldDecorator('joinDate', {
                                rules: [{ required: true, message: '请输入用户加入会员时间!' }],
                                initialValue: record && record.joinDate ? moment(record.joinDate, 'YYYY-MM-DD') : null,
                            })(<DatePicker size='default' locale={locale} />)}
                        </Form.Item>
                        <Form.Item label="性别">
                            {getFieldDecorator('sex', {
                                rules: [{ required: true, message: '请选择用户性别!' }],
                                initialValue: record ? record.sex : "",
                            })(
                                <Radio.Group>
                                    <Radio value="男">男</Radio>
                                    <Radio value="女">女</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                        <Form.Item label="生日">
                            {getFieldDecorator('birthday', {
                                rules: [{ required: true, message: '请输入用户生日!' }],
                                initialValue: record && record.birthday ? moment(record.birthday, 'YYYY-MM-DD') : null,
                            })(<DatePicker size='default' locale={locale} />)}
                        </Form.Item>
                        <Form.Item label="籍贯">
                            {getFieldDecorator('city', {
                                initialValue: cityArr,
                                rules: [
                                    { type: 'array', required: true, message: '请选择用户籍贯！' }],
                            })(<Cascader options={areaData} />)}
                        </Form.Item>

                    </Form>
                </Modal>
            );
        }
    },
);

function mapStateToProps(state) {
    return { "phase": state.customer.phase, optionData: state.cardType.data };
}

export default connect(mapStateToProps, { request: customer_query.request })(CollectionCreateForm);