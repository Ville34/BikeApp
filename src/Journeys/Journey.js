import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';
import bikeCSV from './/bikeData.csv';
import Papa from 'papaparse';

let PageSize = 15;

function Journey(){
	
	
    const [currentPage, setCurrentPage] = useState(2);

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
	console.log(bikeData);
	const currentTableData = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * PageSize;
		const lastPageIndex = firstPageIndex + PageSize;
		return bikeData.slice(firstPageIndex, lastPageIndex);
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
							<td>{item[ "Departure station name" ]}</td>
							<td>{item[ "Return station name" ]}</td>
							<td>{item[ "Covered distance (m)" ]}</td>
							<td>{item[ "Duration (sec.)" ]}</td>		
						</tr>
					</tbody>
					))}
				
				
			</table>
			<div>
	            	            
	            <Pagination
					className="pagination-bar"
					currentPage={currentPage}
					totalCount={bikeData.length}
					pageSize={PageSize}
					onPageChange={page => setCurrentPage(page)}
				/>
	        </div>
			
		</div>

				
			
			
		
	);

}



	
export default Journey;
