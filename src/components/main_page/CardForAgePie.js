import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { connect } from 'react-redux'
import { customerQuery_cardForAge } from '../../redux/actions'
import { Select, Spin, message } from 'antd'
const { Option } = Select;

class CardForAgePie extends React.Component {
    handleChange = value => {
        this.props.request(value);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.phase !== this.props.phase) {
            switch (this.props.phase) {
                case customerQuery_cardForAge.types.ERROR:
                    message.error("网络或系统错误,获取数据失败！");
                    break;
                default: ;
            }
        }
    }
    componentDidMount() {
        this.props.request("1");
    }
    render() {
        let selectOption = this.props.cardTypeData ? this.props.cardTypeData.map((card, index) => {
            return <Option value={card.typeId} key={index}>{card.cardName}</Option>
        }) : [];
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
                    radius: '30%',
                    center: ['40%', '30%'],
                    minShowLabelAngle: 5,
                    avoidLabelOverlap: true,
                    label: {
                        position: "outside",
                    },
                    labelLine: {
                        length: 0.5,
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
            <Select defaultValue="会员卡类型" style={{ width: 120 }} onChange={this.handleChange}>
                {selectOption}
            </Select>
            <Spin spinning={this.props.phase === customerQuery_cardForAge.types.REQUEST}>
                <ReactEcharts option={optionData} />
            </Spin>
        </React.Fragment>
    }
}

function mapStateToProps(state) {
    return {
        "phase": state.customer.phase,
        "data": state.customer.cardForAgeData,
    };
}
export default connect(mapStateToProps, { request: customerQuery_cardForAge.request })(CardForAgePie);