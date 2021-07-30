
const base_url = 'http://localhost:3300';
const base_api_url = `${base_url}/api/mock-project`

const apiUrl = {
	login: `${base_url}/api/login`,
	products: `${base_api_url}/products`,
	order: `${base_api_url}/order`
}

export {
	base_url,
	apiUrl,
	base_api_url
};
