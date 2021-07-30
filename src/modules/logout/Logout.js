import * as commonMethod from 'utils/commonMethod'

function logout (props) {
	commonMethod.handleLogout();

	window.location.href = 'login';
}

export default logout;