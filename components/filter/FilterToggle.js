import React, { Component } from 'react';

class FilterToggle extends Component{

  render(){
		return(
			<ul className="filter-toggle">
				<a href="" className="all active"><li>All</li></a>
				<a href="" className="infrastruktur"><li>Infrastruktur</li></a>
				<a href="" className="identifiering"><li>Identifiering</li></a>
				<a href="" className="molntjanster"><li>Molntjänster</li></a>
			</ul>
    );
  }
}

export default FilterToggle;