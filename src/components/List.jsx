import React, { Component } from 'react';
import { getShipments } from '../services/shipmentService';
import SearchBox from "./search";
import Table from './Table';

import Pagination from './common/pagination';
import { paginate } from "../utils/paginate";


class List extends Component {

	state = {
		shipments: [],
		searchQuery: "",
		currentPage: 1,
		pageSize: 4,
	};

	handleSearch = query => {
    	this.setState({ searchQuery: query, currentPage: 1 });
  	};
  	handlePageChange = page => {
    	this.setState({ currentPage: page });
  	};
	
	async componentDidMount() {
		const { data: shipments } = await getShipments();
		this.setState({ shipments });
	}
	getFilteredData = () => {
		const { 
			searchQuery, 
			shipments: allShipments,
			currentPage,
			pageSize
			 } = this.state;

		let filtered = allShipments;
		if (searchQuery)
			filtered = allShipments.filter(s => s.id.toLowerCase().startsWith(searchQuery.toLowerCase()));
		const paginated = paginate(filtered, currentPage, pageSize);

		return { totalCount: filtered.length, data: paginated};
	}

	render() {
		const { data: shipments, totalCount } = this.getFilteredData();
		const { searchQuery, pageSize, currentPage } = this.state;

		if (totalCount === 0) return <p>No Shipments</p>;

		return (
			<div className="shipment-table">
				<div className="row">
				
					<div className="col-6">
						<SearchBox 
							value={searchQuery} 
							onChange={this.handleSearch} 
						/>
						<p className="total-count">Showing { totalCount } shipments from database </p>
					</div>
				</div>

				<div className="row">
					<div className="col-12">
							<Table shipments={shipments} />
							<Pagination
					          	itemsCount={totalCount}
					           	pageSize={pageSize}
					           	currentPage={currentPage}
					           	onPageChange={this.handlePageChange}
				            />
					</div>
				</div>
			</div>
		);
	}
}


export default List;