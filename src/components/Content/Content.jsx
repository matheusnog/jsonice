import React, { useEffect, useState } from 'react';
import { TextareaAutosize } from '@mui/base';
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
            <Grid direction='row' container spacing={1} style={{ height: '85vh' }} className='p-3'>
                <Grid container item sm={6} className='p-3'>
                    <TextareaAutosize style={{ width: '100%', height: 'auto', overflow: 'auto', resize: 'none' }} value={json} onChange={(e) => setJson(e.target.value)} placeholder='Seu JSON aqui'/>

                </Grid>
                <Grid container item sm={6} className='p-3'>
                    <div className='d-flex align-items-center'>
                        {formattedJson && <JsonViewer value={formattedJson} />}
                    </div>
                </Grid>
            </Grid>
        </>
    )

}

export default Content;