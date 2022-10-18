import React, { Component } from "react";
import {Navbar, Nav, Container} from 'react-bootstrap'

import {
    BrowserRouter as Router,
    Routes,
    Route, 
    Link
} from "react-router-dom"
import About from "../../pages/About";
import Home from "../../pages/Home";
import TodoPage from "../../pages/TodoPage";

export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
            <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}> Home </Nav.Link>
                        <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
                        <Nav.Link as={Link} to={"/TodoPage"}>TodoPage</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </div>
            <div>
                <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/TodoPage" element={<TodoPage/>}/>
                </Routes>
            </div>
            </Router>
        )
    }
}