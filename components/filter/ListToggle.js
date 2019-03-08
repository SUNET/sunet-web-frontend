import React, { Component } from 'react';
import {Grid, List} from "../Icons.js";

class ListToggle extends Component{

	handleChange(e) {
  	const gridID = e.target.value;
  	this.props.changeGrid();
  }

  render(){
		return(
			<ul className="listStyle-toggle">
				<a className={this.props.gridID === 1? "toggle-grid on" : "toggle-grid"} onClick={() => this.props.changeGrid(1)}><li><Grid/></li></a>
				<a className={this.props.gridID === 2? "toggle-list on" : "toggle-list"} onClick={() => this.props.changeGrid(2)}><li><List/></li></a>
			</ul>
    );
  }
}

export default ListToggle;