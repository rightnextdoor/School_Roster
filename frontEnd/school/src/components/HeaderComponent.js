import React,{Component} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

class Header extends Component{
  render(){
    const profile = this.props.profile;
    return (
      <header>
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand >School Name</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
          <Nav>
            <Navbar.Text>
              Signed in as: <a >{profile.firstName}</a>
            </Navbar.Text>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav>
          </Container>
        </Navbar>

      <br />
      </header>
    );
  }
};

export default Header;