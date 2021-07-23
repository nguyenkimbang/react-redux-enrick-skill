import * as actions from 'config/actions'
const initState = {
	succcess: {
    message: '',
    type: ''
  },
  error: {
    message: '',
    type: ''
  },
  confirm: {
    message: '',
    type: ''
  }
}


export default function messageReducer(state = {...initState}, action) {
  if (action.type === actions.SUCCESS) {
    state = {
      ...state,
      ...initState,
      success: {
        message: action.successInfo.message,
        type: action.successInfo.type
      }
    }
  }

  if (action.type === actions.ERROR) {
    state = {
      ...state,
      ...initState,
      error: {
        message: action.errorInfo.message,
        type: action.errorInfo.type
      }
    }
  }

  if (action.type === actions.CONFIRM) {
    state = {
      ...state,
      ...initState,
      confirm: {
        message: action.confirmInfo.message,
        type: action.confirmInfo.type
      }
    }
  }

  return {...state};
}