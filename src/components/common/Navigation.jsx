import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Navigation extends Component {
	render() {
		return (
			<div className="Naviagation">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				  <Link to="/" className="navbar-brand"> Shipment List Dashboard </Link>
				</nav>
			</div>
		);
	}
}

export default Navigation;