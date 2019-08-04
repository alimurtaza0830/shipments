import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/shipmentService';
import { toast } from "react-toastify";

class Details extends Component {
state = {
	data: []
}


async populateItem(){
	try {
		const shipmentId = this.props.match.params.id;
		const { data: product } = await getProduct(shipmentId);
		this.setState({ data: product });

	} catch (ex) {
		if(ex.response && ex.response.status === 404)
			toast.error(ex + 'error occured');
			this.props.history.replace("/not-found");
	}
}

// const singleDetail = this.state.data.map(item => (
// 					  // For each shipment create a row
// 					  <tr key={item.id}>
// 					    {/* For each of the keys, get its value e.g. S1000, T-Shirts 
// 					        from Shanghai to Hamburg, an array of cargo */}
// 					    {Object.values(item).map(subitem => {
// 					      // If the subitem is an array (like cargo) then map over 
// 					      // it and return something for each item
// 					      if (Array.isArray(subitem)) {
// 					        return subitem.map(d => (
// 									<td key={d.volume}>{d.volume}</td>
// 					        	));
// 					      } else {
// 					        // Otherwise just return the string
// 					        return <td>{subitem}</td>;
// 					      }
// 					    })}
// 					  </tr>
// 				));

async componentDidMount() {
    await this.populateItem();
  }
render() {	
	const { data } = this.state;
	return (
		 <div className="details">
		 {
					Object.values(data).map(subitem => {
						if(Array.isArray(subitem)){
							if(subitem === 'cargo'){
								return subitem.map((d, index) => (
										<tr key={d.index}>
											<td>Type: {d.type}</td>
											<td>Description: {d.description}</td>
											<td>Volume: {d.volume}</td>
										</tr>
								))
							} 
							else if(subitem === 'services') {
								return subitem.map((d, index) => (
									<tr key={d.index}>
										<td>Type: {d.type}</td>
										<td>Value: {d.value}</td>
									</tr>
								))
							}
						}
					})
		 }
		 	<ul className="list-group list-group-flush">
		 		<li className="list-group-item"> UserId: { data.userId } </li>
		 		<li className="list-group-item"> Name: { data.name }</li>
		 		<li className="list-group-item"> Mode: { data.mode } </li>
		 		<li className="list-group-item">Destination: {data.destination}</li>
		 		<li className="list-group-item">Origin: {data.origin}</li>
		 		<li className="list-group-item">Status: {data.status}</li>
		 		<li className="list-group-item">Type: {data.type}</li>
		 	</ul>
			{/* 
				Object.keys(data).map(item => (
					  // For each shipment create a row
					  <div className="card mt-10" key={item.id}>
							<div className="card-header">
								Name : { item.name }
							</div>
							<div className="card-body">
								<ul className="list-group list-group-flush">
									<li className="list-group-item">ID: { item.id }</li>
								</ul>
								 {Object.values(item).map(subitem => {
								      if (Array.isArray(subitem)) {
								        return subitem.map(d => (
												<tr key={d.volume}>
													<td>Type: {d.type}</td>
													<td>Description: {d.description}</td>
													<td>Volume: {d.volume}</td>
												</tr>
								        	));
								      } else {
								    return <li className="list-group-item">{subitem}</li>;
							      }
						    	})}
							</div>
							<div className="card-footer">
								<Link to="/" className="btn btn-primary btn-sm">Go Back</Link>
							</div>
					  </div>
				))
			*/ }	
	    </div>
	  )
  }
}

export default Details;