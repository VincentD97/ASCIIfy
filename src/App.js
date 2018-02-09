import React, { Component } from 'react';
import { Card } from 'antd';
// import logo from './logo.svg';
import './App.css';
import Negative from './components/Negative.js';
import Square from './components/Square.js';
import Text from './components/Text.js';
import Circle from './components/Circle.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			width: this.props.width,
			height: this.props.height,
			imgData: [],
			key: "negative",
			active_negative: true,
			active_square: false,
			active_circle: false,
			active_text: false
		};
	}

	_handleImageChange = e => {
		e.preventDefault();

		let file = e.target.files[0];
		
		const image = new Image();
		const reader = new FileReader();

		reader.onloadend = () => {
			image.src = reader.result;
		}
		
		image.onload = () => {
			this.setState({
				width: image.width > this.props.width ? this.props.width : image.width,
				height: image.height * (image.width > this.props.width ? 
					(this.props.width / image.width) : 1)
			});
			this._previewAndSetImgData(this.refs.canvasPreview, image);
		}
		reader.readAsDataURL(file);
	}

	_previewAndSetImgData(canvas, image) {
		canvas.width = this.state.width;
		canvas.height = this.state.height;
		const ctx = canvas.getContext("2d");		
		ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
		this.setState({
			imgData: ctx.getImageData(0, 0, canvas.width, canvas.height)
		});
	}

	_computeAverageRGB(imgData, startx, starty, width, height) {
		let r = 0, g = 0, b = 0, count = 0;
		for (let y = starty; y < starty + height; y++)
			for (let x = startx; x < startx + width; x++) {
				let index = (imgData.width * y + x) * 4;
				r += imgData.data[index + 0] === undefined ? 0 : imgData.data[index + 0];
				g += imgData.data[index + 1] === undefined ? 0 : imgData.data[index + 1];
				b += imgData.data[index + 2] === undefined ? 0 : imgData.data[index + 2];
				count += imgData.data[index + 0] === undefined ? 0 : 1;
			}
		let rgb = {
			r: count === 0 ? 0 : r / count,
			g: count === 0 ? 0 : g / count,
			b: count === 0 ? 0 : b / count
		}
		return rgb;
	}

	onTabChange = (key) => {
		this.setState({
			key: key,
			active_negative: key === "negative",
			active_square: key === "square",
			active_circle: key === "circle",
			active_text: key === "text"
		});
	}

	render() {
		let { width, height, imgData, active_negative, active_square, active_circle, active_text } = this.state;
		const tabList = [{
			key: "negative",
			tab: "Negative"
		}, {
			key: "square",
			tab: "Square"
		}, {
			key: "circle",
			tab: "Circle"
		}, {
			key: "text",
			tab: "Text"
		}];

		return (
			<div className="previewComponent">
				<input className="fileInput" type="file" onChange={this._handleImageChange} />
				<canvas className="myCanvas" ref="canvasPreview" width={width} height={height}/>
				<Card ref="card" style={{ width: '100%' }} title="Card title" /* extra={<a href="#">More</a>} */
				      tabList={tabList} onTabChange={this.onTabChange} hoverable={true}>
					<Negative ref="negative" width={width} height={height} imgData={imgData} active={active_negative}/>
					<Square ref="square" width={width} height={height} imgData={imgData} active={active_square}
						computeAverageRGB={this._computeAverageRGB}/>
					<Circle ref="circle" width={width} height={height} imgData={imgData} active={active_circle}
						computeAverageRGB={this._computeAverageRGB}/>
					<Text ref="text" width={width} height={height} imgData={imgData} active={active_text}
						computeAverageRGB={this._computeAverageRGB}/>
				</Card>
			</div>
		)
	}
}

export default App;
