import React, { Component } from 'react';
import ControlBar from './ControlBar.js';

class Text extends Component {
	constructor(props) {
		super(props);
		this.state = {
            imgData: this.props.imgData,
			fontSize: 5
        };
        this.text = [];
        this.fontSize = 5;
        this.grayCoeff = this.props.grayCoeff === undefined ? {r: 0.299, g: 0.578, b: 0.144} : this.props.grayCoeff;
		this.minGray = this._getGray(0, 0, 0);
		this.grayRange = this._getGray(255, 255, 255) - this.minGray;
	}

	_getGray = (r, g, b) => this.grayCoeff.r * r + this.grayCoeff.g * g + this.grayCoeff.b * b;

	_toText(g) {
		let str = /*"@#*O+."*/"$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.";
		let index = parseInt(str.length * (g - this.minGray) / this.grayRange, 10);
		return index === str.length ? str[index - 1] : str[index];
    }
    
	update( fontSize ) {
        // console.log("updating Text");
        
		let lines = [];
        let imgData = this.props.imgData;

        let dw = 0.62 * fontSize;
        // The relation of the height of a row wrt different fontSize found by measuring in Inspect
        // Particularly for the font "Courier".
        let dh = Math.floor( fontSize * 1.5 );
		if (dw === 0) return;
		for (let h = 0; h < imgData.height; h += dh) {
			let line = "";
			for (let w = 0; w < imgData.width; w += dw) {
				let rgb = this.props.computeAverageRGB(imgData, Math.round(w), h, dw, dh);
				line += this._toText(this._getGray(rgb.r, rgb.g, rgb.b));
			}
			lines.push(line);
        }
        this.text = lines;
	}

	_onChange = value => {
        this.fontSize = value;
		this.setState({
			fontSize: value,
        });
    }

    componentWillUpdate() {
        this.update( this.fontSize );
    }

	render() {
        // console.log("rendering Text");
        if (this.props.active === false) {
            return(<div/>);
        }
		let { fontSize } = this.state;

		return (
			<div>
				<div className="previewText" style={{fontSize: fontSize + "px"}}>
					{this.text.size === 0 ? "" : this.text.map(line => <div>{line}<br /></div>)}
				</div>
				<ControlBar value={fontSize} onChange={this._onChange}/>
			</div>
		)
	}
}

export default Text;