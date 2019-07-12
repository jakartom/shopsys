import React from 'react'
import echarts from 'echarts/lib/echarts';
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'
import { customerQuery_joinPerMonth } from '../../redux/actions'
import { Spin, message } from 'antd'

class CustomerJoinPerMonthBar extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.phase !== this.props.phase) {
            switch (this.props.phase) {
                case customerQuery_joinPerMonth.types.ERROR:
                    message.error("网络或系统错误,获取数据失败！");
                    break;
                default: ;
            }
        }
    }
    componentDidMount() {
        this.props.request();
    }
    render() {
        let optionData = {
            title: {
                text: '每月客户入会员情况',
            },
            tooltip: {},
            xAxis: {
                data: this.props.data ? this.props.data[0] : [],
                axisLabel: {
                    interval: 0,
                    rotate: 45,
                    textStyle: {
                        color: '#000',
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },

            series: [

                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#83bff6 ' },
                                    { offset: 0.5, color: '#188df0 ' },
                                    { offset: 1, color: '#188df0 ' }
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7 ' },
                                    { offset: 0.7, color: '#2378f7 ' },
                                    { offset: 1, color: '#83bff6 ' }
                                ]
                            )
                        }
                    },
                    data: this.props.data ? this.props.data[1] : [],
                }
            ]
        };
        return <Spin spinning={this.props.phase === customerQuery_joinPerMonth.types.REQUEST}>
            <ReactEcharts option={optionData} />
        </Spin>;
    }
}

function mapStateToProps(state) {
    return {
        "phase": state.customer.phase,
        "data": state.customer.joinPerMonthData,
    };
}
export default connect(mapStateToProps, { request: customerQuery_joinPerMonth.request, })(CustomerJoinPerMonthBar);