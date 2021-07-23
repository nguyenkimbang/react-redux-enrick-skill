import React from 'react'
import { withRouter } from "react-router";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout () {
        localStorage.removeItem('token');
        this.props.history.push('login');
    }

    renderHeader () {
        if (! localStorage.getItem('token')) {
            return '';
        }

        return (
            <div className="col-12 header">
                <div className="left-header"></div>
                <div className="right-header">
                    <label onClick={this.logout}>Logout</label>
                </div>
                <div className="clear-fix"></div>
            </div>
        )
    }

    render () {
        return (
            <>
            {this.renderHeader()}
            </>
        )
    }
}

export default withRouter(Header);