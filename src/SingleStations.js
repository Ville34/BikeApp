import React, { useState, useEffect, useMemo } from 'react';
import Pagination from './Pagination';

let PageSize = 1;

function SingleStations() {
	const [stations, setStations] = useState(false);
	const [bike_data, setData] = useState(false);

    const [currentPage, setCurrentPage] = useState(2);

	

	useEffect(() => {
		getStations();
	}, []);
	function getStations() {
		fetch('http://localhost:3001/stations')
			.then(response => {
				return response.text();
			})
			.then(data => {
				setStations(data);
				setCurrentPage(1);
			});


	}

	useEffect(() => {
		getData();
	}, []);
	function getData() {

		fetch('http://localhost:3001')
			.then(response => {
				return response.text();
			})
			.then(data => {
				setData(data);
				
			})
			
			
	
	}

	let stationsArray = JSON.parse(stations);
	stationsArray = Array.from(stationsArray);
	
	const bikeVar = JSON.parse(bike_data);
	const bikeArray = Array.from(bikeVar);
	


	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return stationsArray.slice(firstPageIndex, lastPageIndex);
	  }, [currentPage]);
	

	const stationID = currentTableData.map(station => station.id);
	  console.log(stationID);
	const departures = bikeArray.filter(obj => {
		return obj.departure_station_id === stationID[0];
	})
	const returns = bikeArray.filter(obj => {
		return obj.return_station_id === stationID[0];
	})
	return(
		<div>
			<div className="cardPosition">
				<div className="card text-center bg-light w-50">
					<div className ="card-body">
						<h1 className ="card-title">							

							<p className='stationTitle'>Station:</p>

						</h1>
						{currentTableData.map((item, index) => (
							
							<div className ="card-text" key={index}>
								

									<p className="nimi" key ={item.nimi}>Name: {item.nimi}</p>
									<p className="osoite" key ={item.osoite}>Adress: {item.osoite}</p>
									<p className="osoite">Amount of departures: {departures.length}</p>
									<p className="osoite">Amount of returns: {returns.length}</p>
								
							</div>
							))}
						
						
					</div>
					
					
				</div>
						
			</div>
			<div className='container'>
							
							
				<Pagination
					className="pagination-bar"
					currentPage={currentPage}
					totalCount={stationsArray.length}
					pageSize={PageSize}
					onPageChange={page => setCurrentPage(page)}
				/>
			</div>

		</div>
				
			
			
		
	);
}

export default SingleStations;