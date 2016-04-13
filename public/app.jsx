var CommentBox = React.createClass({
	getInitialState: function () {
		return {
			rpm: 0,
			mph: 0,
			coolantTemp: 0
		};
	},
	componentDidMount: function () {
		var that = this;
		this.socket = io();
		this.socket.on('ecuData', function (data) {
			that.setState({ rpm: data.rpm });
			that.setState({ mph: data.mph });
			that.setState({ coolantTemp: data.coolantTemp });
		});
		this.socket.emit('fetchComments');
	},
	needlePosition: function (rpm) {
		percentRPM = rpm / 12000 * 360 + 90;
		needleStyle = {
			transform : 'rotate(' + percentRPM + 'deg)'
		};
		return needleStyle;
	},
	rpmMarker: function (num, background) {
		var rotatePercent = num / 100 * 360 + 180
		tickStyle = {
			transform : 'rotate(' + rotatePercent + 'deg)'
		}
		var divClass = !background ? "rpm__marker" : "rpm__marker--background"
		return (
			<div style={tickStyle} className={divClass}></div>
			);
	},
	backgroundMarkers: function () {
		var rpmMarkers = []
		for (var i = 0; i < 75; i++) {
			rpmMarkers.push(this.rpmMarker(i, true));
		}
		return rpmMarkers;
	},
	rpmMarkers: function () {
		var percentRPM = this.state.rpm / 120;
		var rpmMarkers = []
		for (var i = 0; i < percentRPM; i++) {
			rpmMarkers.push(this.rpmMarker(i, false));
		}
		return rpmMarkers;
	},
	renderMPH: function () {
		var mph = this.state.mph;
		var hundreds = "mph__number mph__number";
		var tens = "mph__number mph__number";
		var ones = "mph__number mph__number";
		if (mph > 100){
			hundreds += "--" + (mph + "")[0]
			tens += "--" + (mph + "")[1]
			ones += "--" + (mph % 10)
		} else if (mph > 9){
			hundreds += "--0"
			tens += "--" + (mph + "")[0]
			ones += "--" + (mph % 10)
		} else {
			hundreds += "--0"
			tens += "--0"
			ones += "--" + (mph % 10)
		}
		return (
			<div className="mph__container">
				<div className="mph--background"><span className='mph__number--default'></span><span className='mph__number--default'></span><span className='mph__number--default'></span></div>
				<div className="mph"><span className={hundreds}></span><span className={tens}></span><span className={ones}></span></div>
				<p className="mph__label">MPH</p>
			</div>
		);
	},
	renderRPM: function () {
		var rpm = this.state.rpm;
		var thousands = "rpm__number rpm__number";
		var hundreds = "rpm__number rpm__number";
		var tens = "rpm__number rpm__number";
		var ones = "rpm__number rpm__number";
		if (rpm > 1000){
			thousands += "--" + (rpm + "")[0]
			hundreds += "--" + (rpm + "")[1]
			tens += "--" + (rpm + "")[2]
			ones += "--" + (rpm + "")[3]
		} else if (rpm > 100){
			thousands += "--0"
			hundreds += "--" + (rpm + "")[0]
			tens += "--" + (rpm + "")[1]
			ones += "--" + (rpm % 10)
		} else if (rpm > 9){
			thousands += "--0"
			hundreds += "--0"
			tens += "--" + (rpm + "")[0]
			ones += "--" + (rpm % 10)
		} else {
			thousands += "--0"
			hundreds += "--0"
			tens += "--0"
			ones += "--" + (rpm % 10)
		}
		return (
			<div className="rpm-num__container">
				<div className="rpm"><span className={thousands}></span><span className='rpm__number--comma'><img className='comma-image' src='./comma.svg' /></span><span className={hundreds}></span><span className={tens}></span><span className={ones}></span></div>
				<div className="rpm--background"><span className='rpm__number--default'></span><span className='rpm__number--default'></span><span className='rpm__number--default'></span><span className='rpm__number--default'></span></div>
			</div>
		);
	},
	render: function() {

		return (
			<div className="content-container">

				<div className="rpm__container">
					{ this.backgroundMarkers() }
					{ this.rpmMarkers() }
					{ this.renderMPH() }
				</div>
				<div className="small-num__container">
						{ this.renderRPM() }
						<p className="rpm__label">RPM</p>
				</div>
				<p>RPM: {this.state.rpm}</p>
				<p>Coolant Temp (f): {this.state.coolantTemp}</p>
			</div>
		);
	}
});

React.render(
	<CommentBox/>,
	document.getElementById('content')
);
