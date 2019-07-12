import React from 'react'
import { connect } from 'react-redux'
import { cardType_query } from '../../redux/actions'
import CardForSexPie from './CardForSexPie'
import CardForAgePie from './CardForAgePie'
import SexForCardPie from './SexForCardPie'
import AgeForCardPie from './AgeForCardPie'
import CustomerJoinPerMonthBar from './CustomerJoinPerMonthBar'
import { message, Spin, Row, Col } from 'antd'

class Statistics extends React.Component {
    componentDidUpdate(prevProps) {
        if (prevProps.cardTypePhase !== this.props.cardTypePhase) {
            switch (this.props.cardTypePhase) {
                case cardType_query.types.ERROR:
                    message.error("网络或系统错误,获取数据失败！");
                    break;
                default: ;
            }
        }
    }
    componentDidMount() {
        this.props.requestCardOption();
    }
    render() {
        return <Spin spinning={this.props.cardTypePhase === cardType_query.types.REQUEST} >
            <Row gutter={1}>
                <Col span={6} >
                    <CardForSexPie cardTypeData={this.props.cardTypeData} />
                </Col>
                <Col span={6} >
                    <CardForAgePie cardTypeData={this.props.cardTypeData} />
                </Col>
                <Col span={6} >
                    <SexForCardPie />
                </Col>
                <Col span={6}>
                    <AgeForCardPie />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <CustomerJoinPerMonthBar />
                </Col>
            </Row>
        </Spin>
    }
}
function mapStateToProps(state) {
    return {
        "cardTypePhase": state.cardType.phase,
        "cardTypeData": state.cardType.data
    };
}
export default connect(mapStateToProps, { requestCardOption: cardType_query.request })(Statistics);