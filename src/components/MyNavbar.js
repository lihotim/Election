import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';


class MyNavbar extends Component {
    render() {
        return(
            <Navbar bg="light" expand="lg">
              <Navbar.Brand href="#home">2021 World Election</Navbar.Brand>
                <span className="navbar-text">
                    Your account: {this.props.account}
                </span>
             </Navbar>
        );
    }
}

export default MyNavbar;
