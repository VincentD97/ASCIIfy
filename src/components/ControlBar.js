import React, { Component } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';
import './ControlBar.css';

class ControlBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
            value: this.props.initValue
		};
    }
    
	render() {
		return (
            <Row>
                <Col span={20}>
                    <Slider min={1} max={20} step={1} onChange={this.props.onChange} value={this.props.value} />
                </Col>
                <Col span={4}>
                    <InputNumber 
                        min={1} max={20} step={1}
                        style={{ marginLeft: 16 }} 
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                </Col>
            </Row>
		)
	}
}

export default ControlBar;