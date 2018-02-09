import React, { Component } from 'react';
import ControlBar from './ControlBar.js';

class Circle extends Component {
	constructor(props) {
        super(props);
        this.backgroud = this.props.backgroud === undefined ? [255, 255, 255] : this.props.backgroud;
		this.state = {
			size: 5   // length of the side
		};
	}

	update() {
        // console.log("updating Circle");
        
        let ctx, imgData;
        try {
            const canvas = this.refs.canvas;
            canvas.width = this.props.width;
            canvas.height = this.props.height;
            ctx = canvas.getContext("2d");
            imgData = ctx.createImageData(canvas.width, canvas.height);
            imgData.data.set(this.props.imgData.data);
        } catch(error) {
			return;
		}

        let step = this.state.size;
        if (step > 1)
            for (let h = 0; h < imgData.height; h += step) {
                for (let w = 0; w < imgData.width; w += step) {
                    let rgb = this.props.computeAverageRGB(imgData, w, h, step, step);
                    let radius = step / 2.0;
                    for (let y = h; y < h + step; y++)
                        for (let x = w; x < w + step; x++) {
                            let index = (imgData.width * y + x) * 4;
                            if (Math.pow(x - w - radius, 2) + Math.pow(y - h - radius, 2) >= Math.pow(radius, 2))
                                [imgData.data[index + 0], imgData.data[index + 1], imgData.data[index + 2]] = this.backgroud;
                            else {
                                imgData.data[index + 0] = rgb.r;
                                imgData.data[index + 1] = rgb.g;
                                imgData.data[index + 2] = rgb.b;
                            }
                        }
                }
            }

        ctx.putImageData(imgData, 0, 0);
	}

	_onChange = value => {
		this.setState({
			size: value,
		});
	}

    componentDidUpdate() {
        this.update();
    }

	render() {
        // console.log("Circle rendering");
        let { active, width, height } = this.props;
        if (active === false) {
            // console.log("Circle not active");
            return(<div/>);
        }

        return (
			<div>
                <canvas className="myCanvas" ref="canvas"
                    width={width}
                    height={height}
                />
				<ControlBar value={this.state.size} onChange={this._onChange}/>
            </div>
		)
	}
}

export default Circle;