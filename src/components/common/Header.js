import React from 'react'
import { withRouter } from "react-router"
import { Link } from "react-router-dom"
import * as commonMethod from 'utils/commonMethod'
import {Navbar, Container, Nav, Dropdown, ButtonGroup} from 'react-bootstrap'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout () {
        try {
            commonMethod.handleLogout();
        } catch (e) {
            //
        }
        window.location.href = 'login';
    }

    renderHeader () {
        if (! localStorage.getItem('token')) {
            return '';
        }
        let user_name = '';
        if (localStorage.getItem('customerInfo')) {
            const user = JSON.parse(localStorage.getItem('customerInfo'));
            user_name = user.first_name + ' ' + user.last_name;
        }

        return (
            <div className="w-100">
                <Navbar bg="light">
                    <Container>
                        <Nav variant="pills" defaultActiveKey="/">
                          <Nav.Item>
                            <Nav.Link as={Link} className={this.props.location.pathname === '/' ? 'active' : ''} to="/">Product</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link as={Link}  className={this.props.location.pathname === '/cart' ? 'active' : ''} to="/cart">Cart</Nav.Link>
                          </Nav.Item>
                        </Nav>
                        <Navbar.Collapse className="justify-content-end">
                            <Dropdown as={ButtonGroup}>
                                <div className="align-self-center">{user_name}</div>
                                <Dropdown.Toggle split variant="" id="dropdown-split-basic" style={{border: 'none', outline: 'none', 'boxShadow': 'none'}} />
                                    <Dropdown.Menu style={{left: 'auto', right: 0, cursor: 'pointer'}}>
                                        <div className="dropdown-item" onClick={this.logout}>Logout</div>
                                    </Dropdown.Menu>
                                </Dropdown>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
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