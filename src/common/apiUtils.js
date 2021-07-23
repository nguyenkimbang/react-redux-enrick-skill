
import axios from 'axios';
import {apiUrl} from  './../utils/LocalApi'
const token = localStorage.getItem('token') || '';
const headerDefault = {
	headers:{
		'Authorization': `${token}`
	}
};

function postUnAuth(url, data, header) {
	return new Promise((resolve, reject) => {
		axios.post(apiUrl[url], data, header).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.response || err);
		})
	})
}

function post(url, data, header) {
	return new Promise((resolve, reject) => {
		axios.post(apiUrl[url], data, {...headerDefault, ...header}).then(res => {
			resolve(res);
		}).catch(err => {
			reject(err.response || err);
		})
	})
}

function get(url, header = {}) {
	return new Promise((resolve, reject) => {
		axios.get(apiUrl[url], {...headerDefault, ...header}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.response || err);
		})
	})
}

export {
	postUnAuth,
	post,
	get
}