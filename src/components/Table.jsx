import React from 'react';
import { Link } from 'react-router-dom';


const Table = ({ shipments }) => {

	const renderShipments = shipments.map(item => (
					<tr key={item.id}>
						<td>
							<Link to={`/product/${item.id}`}>{item.id}</Link>
						</td>
						<td>{ item.name }</td>
						<td>{ item.origin }</td>
						<td>{ item.type }</td>
						<td>{ item.status}</td>
					</tr>
		));
	
  return (
    	<table className="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Item Name</th>
					<th>Origin</th>
					<th>Type</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody> 
			{ renderShipments } 
			</tbody>
		</table>
  	)
}

export default Table;