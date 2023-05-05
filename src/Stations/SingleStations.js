import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';
import stationsCSV from './/stations.csv'
import bikeCSV from '../Journeys/bikeData.csv'
import Papa from 'papaparse'


let PageSize = 1;

function SingleStations() {
	


    const [currentPage, setCurrentPage] = useState(2);
	const [stations, setStations] = React.useState([]);

		React.useEffect(() => {
			async function getData() {
			const response = await fetch(stationsCSV)
			const reader = response.body.getReader()
			const result = await reader.read()
			const decoder = new TextDecoder('utf-8')
			const csv = decoder.decode(result.value)
			const results = Papa.parse(csv, { header: true })
			const stations = results.data
			
			setStations(stations) 
			}
			getData()
			
		}, [])
	

		const [bikeData, setData] = React.useState([]);
	
			React.useEffect(() => {
				async function getData() {
				const response = await fetch(bikeCSV)
				const reader = response.body.getReader()
				const result = await reader.read()
				const decoder = new TextDecoder('utf-8')
				const csv = decoder.decode(result.value)
				const results = Papa.parse(csv, { header: true })
				const bikeData = results.data			
				setData(bikeData)
				}
				getData()
				.then(a => {
					
					setCurrentPage(1);
				})
				
			}, [])
	


	


	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return stations.slice(firstPageIndex, lastPageIndex);
	  }, [currentPage]);


	
	const stationID = currentTableData.map(station => station.ID);
	
	const departures = bikeData.filter(obj => {
		return obj[ 'Departure station id' ] === stationID[0];
	})
	const returns = bikeData.filter(obj => {
		return obj[ 'Return station id' ] === stationID[0];
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
								

									<p className="nimi" key ={item.Nimi}>Name: {item.Nimi}</p>
									<p className="osoite" key ={item.Osoite}>Adress: {item.Osoite}</p>
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
					totalCount={stations.length}
					pageSize={PageSize}
					onPageChange={page => setCurrentPage(page)}
				/>
			</div>

		</div>
				
			
			
		
	);
}

export default SingleStations;