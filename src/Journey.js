import React, { useState, useEffect, useMemo } from 'react';
import Pagination from './Pagination';

let PageSize = 15;

function Journey(){
	
	const [bike_data, setData] = useState(false);
    const [currentPage, setCurrentPage] = useState(2);

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
				setCurrentPage(1);			
			})				
	}
	
	var bikeVar = JSON.parse(bike_data);
	var bikeArray = Array.from(bikeVar);
	
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return bikeArray.slice(firstPageIndex, lastPageIndex);
	  }, [currentPage]);
	
	return(

		<div>
			<table rowkey ="id" className ="table table-bordered table-striped table-hover">
				<thead key ="{thead}">
					<tr key ="{head-tr}">
						<th key="{head-dep-name}">Departure Station Name</th>
						<th key="{head-ret-name}">Return Station Name</th>
						<th key="{head-m}">Covered Distance(m)</th>
						<th key="{head-sec}">Duration(sec.)</th>
					</tr>
				</thead>
				{currentTableData.map((item, index) => (
					<tbody key ={index}>
						<tr>
							<td>{item.departure_station_name}</td>
							<td>{item.return_station_name}</td>
							<td>{item.covered_distance_m}</td>
							<td>{item.duration_sec}</td>		
						</tr>
					</tbody>
					))}
				
				
			</table>
			<div>
	            	            
	            <Pagination
					className="pagination-bar"
					currentPage={currentPage}
					totalCount={bikeArray.length}
					pageSize={PageSize}
					onPageChange={page => setCurrentPage(page)}
				/>
	        </div>
			
		</div>

				
			
			
		
	);

}



	
export default Journey;
