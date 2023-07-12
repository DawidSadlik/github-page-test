import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Root = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>React test</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={`/`}>Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`aboutme`}>About me</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`contact`}>Contact</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`meongithubpage`}>Me on GitHub</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to={`microsoftongithub`}>Microsoft on github</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
      {/* <UserContext.Provider value={{ value: "Some value", name: "Some name" }}>
        <Outlet />
      </UserContext.Provider> */}
    </div>
  );
};

export default Root;
