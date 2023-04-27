import React, { useState, useEffect, useMemo } from 'react';
import Pagination from './Pagination';

let PageSize = 15;

function Stations() {
	const [stations, setStations] = useState(false);
	

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

	var stationsArray = JSON.parse(stations);
	stationsArray = Array.from(stationsArray);
	
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return stationsArray.slice(firstPageIndex, lastPageIndex);
	  }, [currentPage]);

	return(
		<div>
			<table className ="table table-bordered table-striped table-hover text-center">
				<thead key ="{thead}">
					<tr key ="{head-tr}">

						<th key="{head-nimi}">Nimi</th>

					</tr>
				</thead>
				{currentTableData.map((item, index) => (
					<tbody key={index}>
						<tr>
							<td key ={item.nimi}>{item.nimi}</td>
						</tr>
					</tbody>
					))}
				
				
			</table>
			<div className='container mt-5'>
										
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

export default Stations;