import * as actions from 'config/actions'
export const doLoginAction = (loginInfo) => {
	return {type: actions.DO_LOGIN, payload: {loginInfo}}
};