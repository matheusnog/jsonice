import React from 'react';
import { TextareaAutosize } from '@mui/base';
import { Container } from 'react-bootstrap';

class Content extends React.Component {
    render() {
        return (
            <Container fluid="md">
                <TextareaAutosize style={{width: '100%', height: 100}}/>
            </Container>
        )
    }
}

export default Content;