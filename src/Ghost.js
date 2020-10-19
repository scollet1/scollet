import React, { Component } from 'react';

import { Motion, spring } from'react-motion';
import { SpriteAnimator } from 'react-sprite-animator'

import run from './assets/Barrel_Knight/run.png';
import attack from './assets/Barrel_Knight/attacks.png';

const FPS = 12;
const SPEED = 50;
const DAMAGE = 10;

const sprite_tracks = {
	'walk': {
		'rows': 1,
		'cols': 7,
		'width': 1092,
		'height': 64,
		'image': run
	},
	'attack': {
		'rows': 1,
		'cols': 14,
		'width': 2184, // 2184
		'height': 64,
		'image': attack
	}
}

class Ghost extends Component {
	computeVelocity(curr_vel) {
		let velocity = curr_vel;
		if (this.props.mousePosition.x < this.state.position.x) {
			velocity.x = -1;
			this.setState({
				scale: {x:-1, y:1}
			});
		} else if (this.props.mousePosition.x > this.state.position.x) {
			velocity.x = 1;
			this.setState({
				scale: {x:1, y:1}
			});
		}

		if (this.props.mousePosition.y < this.state.position.y) {
			velocity.y = -1;
		} else if (this.props.mousePosition.y > this.state.position.y) {
			velocity.y = 1;
		}

		return velocity;
	}

	vectorAdd(va, vb) {
		va.x += vb.x;
		va.y += vb.y;
		return va;
	}

	vectorMultiply(vector, value) {
		vector.x *= value;
		vector.y *= value;
		return vector;
	}

	closeToPlayer(cur_pos, threshold) {
		let p1 = cur_pos;
		let p2 = this.props.mousePosition;

		let dist = Math.sqrt(
			Math.pow(p2.x - p1.x, 2)
			+ Math.pow(p2.y - p1.y, 2)
		);

		return dist <= threshold;
	}

	toGlobal(vector) {
		return vector;
	}

	update(delta) {
		let velocity = this.computeVelocity(this.state.velocity);
		let position = this.vectorAdd(
			this.state.position,
			this.vectorMultiply(velocity, SPEED * delta)
		);

		let anim = 'walk';
		this.setState({stopLastFrame:false});

		if (this.closeToPlayer(this.toGlobal(position), 5) === true) {
			anim = 'attack';
			this.setState({stopLastFrame:true});
		}

		this.setState({
			velocity: velocity,
			position: position,
			current_animation: anim
		});
	}

	finishAttackFrame() {
		let position = this.state.position;

		if (this.closeToPlayer(this.toGlobal(position), 2)) {
			this.props.dealPlayerDamage(DAMAGE);
		}

		this.setState({
			current_animation: 'walk',
			stopLastFrame: false,
			shouldAnimate: true,
			currentFrame: 0
		});
	}

	render() {
		let scale = this.state.scale;
		let cur_pos = this.state.position;
		let cur_ani = this.state.current_animation;
		let st = sprite_tracks[cur_ani];
	    // const {x, y} = this.props.mousePosition;

	    console.log(cur_ani);

	    return (
	    	<Motion style={{x: spring(0)}}>
				{ () => (
					<div
						style={{
							width: 20,
							height: 20,
							WebkitTransform: `translate3d(${cur_pos.x - 120}px, ${cur_pos.y - 75}px, 0) scale(${scale.y})`,
							transform: `translate3d(${cur_pos.x - 120}px, ${cur_pos.y - 75}px, 0) scale(${scale.y})`,
						}}
					>
						<SpriteAnimator
							sprite={st['image']}
							fps={FPS}
							frame={0}
							scale={0.5}
							width={
								st['width'] / st['cols']
							}
							height={
								st['height'] / st['rows']
							}

							startFrame={0}
							shouldAnimate={this.state.shouldAnimate}
							stopLastFrame={this.state.stopLastFrame}
							onEnd={this.finishAttackFrame.bind(this)}
	                	/>
                	</div>
            	)}
            </Motion>
	    );
	}

	constructor(props) {
		super(props);

		this.state = {
			position: {x: 250, y: 250},
			velocity: {x: 0, y:0},
			scale: {x:1, y:1},

			current_animation: 'walk',
			shouldAnimate: true,
			stopLastFrame: false,
			currentFrame: 0,

			attacking: false
		};

		this.update = this.update.bind(this);
	}
}

export default Ghost;
