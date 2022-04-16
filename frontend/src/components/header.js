import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
// import { LinkContainer } from "react-router-bootstrap";

const Header = ({ user, handleLogout }) => {
	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Navbar.Brand>Smart Home</Navbar.Brand>

				<Nav className='me-auto'>
					<Nav.Link
						as={NavLink}
						to='/dashboard'
						style={{ color: "rgb(65, 224,253)" }}>
						Dashboard
					</Nav.Link>
					<Nav.Link
						style={{ color: "rgb(65, 224,253)" }}
						as={NavLink}
						to='/admin-panel'>
						Admin Panel
					</Nav.Link>
				</Nav>

				<Form className='d-flex'>
					<p className='userName' style={{ color: "rgb(65, 224,253)" }}>
						{user.user.username}
					</p>
					<Button
						variant='outline-info'
						style={{ height: "50px", color: "rgb(65, 224,253)" }}
						onClick={() => handleLogout()}>
						Logout
					</Button>
				</Form>
			</Container>
		</Navbar>
	);
};

export default Header;
