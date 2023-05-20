import React, { useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/base';
import { FormLabel } from 'react-bootstrap';
import { JsonViewer } from '@textea/json-viewer'
import { Grid } from '@mui/material';


const Content = () => {
    const [json, setJson] = useState('')
    const [formattedJson, setFormattedJson] = useState(null)

    useEffect(() => {
        if (json) {
            if (isJsonString(json)) {
                var json_value = JSON.parse(json)
                setFormattedJson(json_value)
            }
        }
    }, [json])

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    return (
        <>
            <Grid direction='row' container spacing={1} style={{ minHeight: '100vh' }} className='p-3'>
                <Grid container item sm={6} className='p-3'>
                    <FormLabel>Insira o JSON aqui:</FormLabel>
                    <TextareaAutosize style={{ width: '100%', minHeight: '90vh' }} value={json} onChange={(e) => setJson(e.target.value)} />

                </Grid>
                <Grid container item sm={6} className='p-3'>
                    <FormLabel>JSON estilizado:</FormLabel>
                    <div className='d-flex align-items-center'>
                        {formattedJson && <JsonViewer value={formattedJson} />}
                    </div>
                </Grid>
            </Grid>
        </>
    )

}

export default Content;