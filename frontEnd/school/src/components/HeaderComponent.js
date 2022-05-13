import React,{Component} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

class Header extends Component{
  render(){
    const profile = this.props.profile;
    const currentPath = window.location.pathname;
    return (
      <header>
        <Navbar bg="primary" variant="dark">
          <Container>
          <Navbar.Brand >School Name</Navbar.Brand>
            {currentPath !== '/createProfile' &&
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/student">Student</Nav.Link>
                <Nav.Link href="/teacher">Teacher</Nav.Link>
                <Nav.Link href="/leader">Leaders</Nav.Link>
                <Nav.Link href="/myRoster">My Roster</Nav.Link>
                <Nav.Link href="/allRoster">All Roster</Nav.Link>
              </Nav>
            }
            <Nav className="me-auto">
              <Nav.Link href="/createStudents">Create Student</Nav.Link>
              <Nav.Link href="/createTeachers">Create Teacher</Nav.Link>
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