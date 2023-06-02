import { TextareaAutosize } from '@mui/base';
import HistoryIcon from '@mui/icons-material/History';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Fab, Grid, Modal, Box, Typography } from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import React, { useEffect, useState } from 'react';
import './Content.css';
import History from '../History/History';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '90%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Content = () => {
    const [json, setJson] = useState('')
    const [formattedJson, setFormattedJson] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [history, setHistory] = useState('')
    const [theme, setTheme] = useState('light')
    const [btnBackColor, setbtnBackColor] = useState('#fff')
    const [btnColor, setbtnColor] = useState('#000')

    useEffect(() => {
        try {
            if (json && json !== '') {
                if (isJsonString(json)) {
                    var json_value = JSON.parse(json)
                    setFormattedJson(json_value)
                    const id = Date.now()
                    localStorage.setItem(id, JSON.stringify(json_value))
                }
            }
        } catch (error) {
            console.log(error)
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

    function openHistoryModal() {
        showHistory()
        setModalOpen(true)
    }

    function showHistory() {
        setHistory(<History setJson={setJson} />)
    }

    function clearHistory() {
        localStorage.clear();
        showHistory()
    }

    function changeColor() {
        if (theme === 'light') {
            setTheme('dark')
            setbtnColor('#fff')
            setbtnBackColor('#000')
        } else {
            setTheme('light')
            setbtnColor('#000')
            setbtnBackColor('#fff')
        }
    }

    return (
        <>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div style={{ alignContent: 'end', alignItems: 'end', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Histórico:
                        </Typography>
                        <Fab size="small" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} aria-label="add" onClick={() => clearHistory()}>
                            <CleaningServicesIcon />
                        </Fab>
                    </div>
                    <div>
                        {history}
                    </div>
                </Box>
            </Modal>
            <Grid direction='row' container spacing={1} className='p-3 h85'>
                <Grid container item sm={6} className='p-3'>
                    <TextareaAutosize
                        value={json}
                        className='textArea'
                        onChange={(e) => setJson(e.target.value)}
                        placeholder='Seu JSON aqui'
                    />
                </Grid>
                <Grid container item sm={6} className='p-3' style={{ overflow: 'scroll', maxHeight: '100%' }}>
                    <div className='align-items-end text-end' style={{ width: '100vh', marginBottom: 5 }}>
                        <Fab color='inherit' style={{ marginRight: 5, backgroundColor: btnBackColor, color: btnColor }} aria-label="add" onClick={() => changeColor()}>
                            <DarkModeIcon />
                        </Fab>
                        <Fab style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} aria-label="add" onClick={() => openHistoryModal()}>
                            <HistoryIcon />
                        </Fab>
                    </div>
                    <div className='d-flex align-items-center'>
                        {formattedJson && <JsonViewer value={formattedJson} theme={theme} />}
                    </div>
                </Grid>
            </Grid>
        </>
    )

}

export default Content;