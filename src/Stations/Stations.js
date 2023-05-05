import React, { useState, useMemo } from 'react';
import Pagination from '../Pagination/Pagination';
import Papa from 'papaparse';
import csvFile from './/stations.csv';
let PageSize = 15;

function Stations() {
	
    const [currentPage, setCurrentPage] = useState(2);
	const [stations, setStations] = React.useState([]);

		React.useEffect(() => {
			async function getData() {
			const response = await fetch(csvFile)
			const reader = response.body.getReader()
			const result = await reader.read()
			const decoder = new TextDecoder('utf-8')
			const csv = decoder.decode(result.value)
			const results = Papa.parse(csv, { header: true })
			const stations = results.data
			setStations(stations)
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
	  
	return(
		<div>
			<table className ="table table-bordered table-striped table-hover text-center">
				<thead key ="{thead}">
					<tr key ="{head-tr}">

						<th key="{head-nimi}">Name</th>

					</tr>
				</thead>
				{currentTableData.map((item, index) => (
					<tbody key={index}>
						<tr>
							<td key ={item.Nimi}>{item.Nimi}</td>
						</tr>
					</tbody>
					))}
				
				
			</table>
			<div className='container mt-5'>
										
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

export default Stations;