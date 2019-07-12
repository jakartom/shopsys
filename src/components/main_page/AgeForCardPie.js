import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'
import { customerQuery_ageForCard } from '../../redux/actions'
import { Select, Spin, message } from 'antd'
const { Option } = Select;

class AgeForCardPie extends React.Component {
    handleChange = value => {
        this.props.request(value);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.phase !== this.props.phase) {
            switch (this.props.phase) {
                case customerQuery_ageForCard.types.ERROR:
                    message.error("网络或系统错误,获取数据失败！");
                    break;
                default: ;
            }
        }
    }
    componentDidMount() {
        this.props.request("0");
    }
    render() {
        let optionData = {
            title: {
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '用户数',
                    type: 'pie',
                    radius: '40%',
                    center: ['40%', '30%'],
                    label: {
                        position: "outside",
                        width: 20
                    },
                    labelLine: {
                        length: 1,
                        smooth: true
                    },
                    data: this.props.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return <React.Fragment>
            <Select defaultValue="0" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="0">0-17岁</Option>
                <Option value="1">18-45岁</Option>
                <Option value="2">46-69岁</Option>
                <Option value="3">69岁以上</Option>
            </Select>
            <Spin spinning={this.props.phase === customerQuery_ageForCard.types.REQUEST}>
                <ReactEcharts option={optionData} />
            </Spin>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return {
        "phase": state.customer.phase,
        "data": state.customer.ageForCardData,
    };
}
export default connect(mapStateToProps, { request: customerQuery_ageForCard.request })(AgeForCardPie);