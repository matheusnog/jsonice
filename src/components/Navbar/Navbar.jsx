import React from 'react';
import { Container, Navbar as NavBootstrap } from 'react-bootstrap';
import './Navbar.css'

class Navbar extends React.Component {
    render() {
        return (
            <NavBootstrap className='bgGray'>
                <Container>
                    <NavBootstrap.Brand href="#home">JSONice</NavBootstrap.Brand>
                    <span>Formatador e estilizador de JSON</span>
                </Container>
            </NavBootstrap>
        )
    }
}

export default Navbar;