import { Container, Navbar, Form, FormControl } from 'react-bootstrap';

const Header = () => (
    <Navbar fixed="top" bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand href="#">Rick and Morty</Navbar.Brand>
            <Form className="d-flex w-25">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-6"
                    aria-label="Search"
                />
            </Form>
        </Container>
    </Navbar>
)

export default Header