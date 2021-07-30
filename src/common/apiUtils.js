
import axios from 'axios';
import {apiUrl, base_api_url} from  './../utils/LocalApi'
import logout from 'modules/logout/Logout'

const headerDefault = () => {
	const token = localStorage.getItem('token') || '';
	return {
		headers:{
			'Authorization': `${token}`
		}
	}
};

function postUnAuth (url, data, header) {
	return new Promise((resolve, reject) => {
		axios.post(apiUrl[url], data, header).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.response || err);
		})
	})
}

function post (url, data, header = {}) {
	let linkReq = apiUrl[url];
	if (! linkReq) {
		linkReq = `${base_api_url}/${url}`;
	}
	header = {...headerDefault(), ...header};
	return new Promise((resolve, reject) => {
		axios.post(apiUrl[url], data, {...header}).then(res => {
			resolve({result: res.data, code: res.status});
		}).catch(err => {
			if (err.response && err.response.status === 401) {
				return logout();
			}
			reject(err.response || err);
		})
	})
}

function get (url, header = {}, params = {}) {
	let linkReq = apiUrl[url];
	if (! linkReq) {
		linkReq = `${base_api_url}/${url}`;
	}
	header = {...headerDefault(), ...header, params};
	return new Promise((resolve, reject) => {
		axios.get(linkReq, {...header}).then(res => {
			resolve({result: res.data, code: res.status});
		}).catch(err => {
			if (err.response && err.response.status === 401) {
				return logout();
			}
			reject(err.response || err);
		})
	})
}

export {
	postUnAuth,
	post,
	get
}