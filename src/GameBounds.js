/*
https://stackoverflow.com/questions/54066805/how-to-implement-a-gameloop-with-requestanimationframe-across-multiple-react-red
*/

import React, { Component } from 'react';
import Ghost from './Ghost';
import './GameBounds.css';

var lastUpdate = Date.now();

class GameBounds extends Component {
	dealPlayerDamage(damage) {
		this.setState({
			health: this.state.health - damage
		});
	}

	componentDidMount() {  
		this.animationID = window.requestAnimationFrame(() => this.update());
	}

	componentWillUnmount() {
		window.cancelAnimationFrame(this.animationID);
	}

	update() {
		let now = Date.now();
    	let delta = (now - lastUpdate) * 0.001;
    	lastUpdate = now;

    	console.log(this.state.health);

		this.componentsToUpdate.map(component => component.current.update(delta));
		this.animationID = window.requestAnimationFrame(() => this.update());
	}


	retryButtonClick() {
		this.componentsToUpdate = this.components;
		this.setState({
			health: 100
		});
	}

	handleMouseMove(e) {
		this.setState({
			mousePosition: {
				x: e.pageX,
				y: e.pageY
			}
		});
	}

	renderGameState() {
		if (this.state.health <= 0) {
			this.componentsToUpdate = [];
			return (
				<div class="retry-section">
					Game Over Man!

					<br/>

					<button
						class="retry-button"
						onClick={this.retryButtonClick.bind(this)}
					>
						Retry?
					</button>
				</div>
			);
		} else {
			return (
				<div>
					<Ghost ref={this.ghost}
						mousePosition={this.state.mousePosition}
						dealPlayerDamage={this.dealPlayerDamage}
					/>

					<div class="projects">
						<h1 class="header">Projects</h1>

						<h2>Game Dev and Design</h2>
						<div class="section">
							<h3>Godot</h3>
							<div class="sub-section">
								<div class="project">
									<figure>
										<a class="link" href="https://github.com/scollet1/Hack.hero">
											<img src="https://raw.githubusercontent.com/scollet1/Hack.hero/master/haco_hero.gif"/>
										</a>
										<figcaption>
											Hack.hero
										</figcaption>
									</figure>
								</div>
								
									<br/>

								<div class="project">
									<figure>
										<a class="link" href="https://medium.com/@samuelpcollet/under-pressure-black-hole-visual-shaders-in-godot-ae2738d0abec">
											<img src="https://github.com/scollet1/solus/raw/master/solus.gif"/>
										</a>
										<figcaption>
											Black Hole Visual Shader
										</figcaption>
									</figure>
								</div>

									<br/>

								<div class="project">
									<figure>
										<a class="link" href="https://github.com/scollet1/Dynamic-L-System">
											<img src="https://raw.githubusercontent.com/scollet1/Dynamic-L-System/master/wind-tree.gif"/>
										</a>
										<figcaption>
											Dynamic L Systems
										</figcaption>
									</figure>
								</div>

									<br/>
								
								<div class="project">
									<figure>
										<a class="link" href="https://github.com/scollet1/Lightning-Example">
											<img src="https://github.com/scollet1/Lightning-Example/raw/master/lightning.gif"/>
										</a>
										<figcaption>
											2D Lightning Demo
										</figcaption>
									</figure>
								</div>

							</div>
								
							<h3>React</h3>
							<div class="sub-section">
								<div class="project">
									<figure>
										<a class="link" href="https://github.com/scollet1/scollet1.github.io">
											<img src="/images/SmallFantasticBabirusa-size_restricted.gif"/>
										</a>
										<figcaption>
											Games Showcase
										</figcaption>
									</figure>
								</div>
							</div>
						</div>

							<br/>

						<h2>Security</h2>
						<div class="section">
							<h3>Networking</h3>
							<div class="sub-section">
								<div class="project">
									<a class="link" href="https://github.com/scollet1/Snafu">Golang Packet Sniffer</a>
								</div>
							</div>
						</div>

						<h2>Art</h2>
						<div class="section">
							<div class="project">
								<img class="painting" src="/images/angime.png"/>
								<img class="painting" src="/images/random_perason.png"/>
								<img class="painting" src="/images/real_fall_guys.png"/>
								<img class="painting" src="/images/ethead.png"/>
								<img class="painting" src="/images/edhead.png"/>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

    render() {
        return (
            <div
				style={{
					  position: "absolute",
					  display: "flex",
					  flexGrow: "0",
					  width: "100vw",
				}}
    			onMouseMove={this.handleMouseMove}
			>
				{this.renderGameState()}
			</div>
        )
    }

    constructor(props) {
    	super(props);

    	const ghost = this.ghost = React.createRef();

    	this.componentsToUpdate = [ghost];
    	this.components = this.componentsToUpdate;

    	this.animationID = null;

    	this.state = {
			health: 100,
			mousePosition: {
				x: 0,
				y: 0
			}
    	}

    	this.update = this.update.bind(this);
    	this.dealPlayerDamage = this.dealPlayerDamage.bind(this);
    	this.handleMouseMove = this.handleMouseMove.bind(this);
    }
}

export default GameBounds