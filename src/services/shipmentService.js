import http from './httpService';
import { apiUrl } from "../config.json";

export function getShipments() {
	return http.get(apiUrl + "/shipments");
}

function productUrl(id){
	return `${apiUrl}/shipments/${id}`;
}

export function getProduct(id) {
  return http.get(productUrl(id));
}