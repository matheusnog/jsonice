import React, { useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { Container, FormLabel } from 'react-bootstrap';

const Content = () => {
    const [json, setJson] = useState(null)
    return (
        <Container fluid="md" className='mt-3'>
            <FormLabel>Insira o JSON aqui:</FormLabel>
            <TextareaAutosize style={{ width: '100%', height: 100 }} value={json} onChange={(e) => setJson(e.target.value)} />
            <FormLabel>JSON estilizado:</FormLabel>
            <TextareaAutosize style={{ width: '100%', height: 100 }} />
        </Container>
    )

}

export default Content;