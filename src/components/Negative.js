import React, { Component } from 'react';

class Negative extends Component {
	update() {
		// console.log("updating Negative");		
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

		for (let h = 0; h < imgData.height; h++) {
			for (let w = 0; w < imgData.width; w++) {
				let index = (w + imgData.width * h) * 4;
				imgData.data[index + 0] = 255 - imgData.data[index + 0];
				imgData.data[index + 1] = 255 - imgData.data[index + 1];
				imgData.data[index + 2] = 255 - imgData.data[index + 2];
			}
		}
		ctx.putImageData(imgData, 0, 0);
	}

	componentDidUpdate() {
        this.update();
    }

	render() {
		// console.log("rendering Negative");
		let { active, width, height } = this.props;
		if (active === false) {
            return(<div/>);
		}

		return (
			<canvas className="myCanvas" ref="canvas"
				width={width}
				height={height}
			/>
		)
	}
}

export default Negative;