import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from "react-router";

class StudyRedux extends React.Component {
	render () {
		const {data: {name}, action} = this.props;
		console.log(this.props)
		return (
			<div className="container mt-4">
				<div className="row">
					<div className="col-12">
						<input value={name} onChange={(e) => action.actionAsync({type: 'changeName', name: e.target.value})}/>
					</div>
					<div className="col-12">New value: {name}</div>
				</div>
			</div>
		)
	}
}

const mapStateToProp = currentState => {
	return {data: currentState.dataDemo}
	//return {data: {...currentState.dataDemo}, name_test: currentState.test.name}
	//return {data: {name: currentState.dataDemo.name}, name_test: currentState.test.name}
}

function actionAsync(data) {
	return (dispatch, getState) => {
		setTimeout(() => {
			console.log(getState())
			dispatch(data)
		},1000)
	}
	
}

const mapDispatchToProps = (dispatch, ownerProp) => {
	//console.log(ownerProp, 'ownerProp');
	return {action: bindActionCreators({actionAsync}, dispatch)}
	//return {action: {changeName: (data) => dispatch({...data})}}
}

export default  connect(mapStateToProp, mapDispatchToProps)(withRouter(StudyRedux));