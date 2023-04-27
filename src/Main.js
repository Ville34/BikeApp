import React from 'react';
import { Routes, Route, NavLink, HashRouter } from "react-router-dom";
import Home from "./Home";
import Stations from "./Stations";
import Journey from "./Journey";
import SingleStations from "./SingleStations";


function Main() {
	
	
	return(
		<div>
			<HashRouter>
				<div>
					<ul className="header">
						<li><NavLink to="/">Home</NavLink></li>
						<li><NavLink to="/journeys">Journey List</NavLink></li>
						<li><NavLink to="/stations">Stations List</NavLink></li>
						<li><NavLink to="/singleStation">Stations</NavLink></li>
					</ul>
					<div>
						<Routes className="content">
							<Route exact path="/" element={<Home/>}/>
							<Route path="/journeys" element={<Journey/>}/>
							<Route path="/stations" element={<Stations/>}/>
							<Route path="/singleStation" element={<SingleStations/>}/>
						</Routes>
					</div>
					
				</div>
			</HashRouter>
			
		</div>
	);
}

 

export default Main;
