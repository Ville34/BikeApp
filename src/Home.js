import React, { Component } from 'react';

class Home extends Component {
	render() {
		return(
			<div className="homeText">
				<h2> Bike App</h2>
				<p>This app allows you to see the bike stations from Espoo and Helsinki, as well as some biking trips by users. <br></br>
				From the Journey List-tab you can find all the biking journeys from the months of march, june and july of 2021.<br></br> 
				From the Stations List tab, you can find a list of all the stations from Espoo and Helsinki. <br></br>
				From the Stations tab you can find all the stations one by one with additional information on them. </p>
				
			</div>
			);
	}
} 

export default Home;