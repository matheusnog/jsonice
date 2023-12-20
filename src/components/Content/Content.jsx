import { TextareaAutosize } from '@mui/base';
import HistoryIcon from '@mui/icons-material/History';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { Fab, Grid, Modal, Box, Typography, Button } from '@mui/material';
import { JsonViewer } from '@textea/json-viewer';
import React, { useEffect, useState } from 'react';
import './Content.css';
import History from '../History/History';
import _ from 'lodash';
import toast, { Toaster } from 'react-hot-toast';

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
    const [modalAttrOpen, setModalAttrOpen] = useState(false)
    const [type, setType] = useState('')
    const [history, setHistory] = useState('')
    const [theme, setTheme] = useState('light')
    const [btnBackColor, setbtnBackColor] = useState('#fff')
    const [btnColor, setbtnColor] = useState('#000')

    useEffect(() => {
        var json_value = ''
        if (json && json !== '') {
            if (isJsonString(json)) {
                json_value = JSON.parse(json)
                setFormattedJson(json_value)
            }
        }
        const saveJson = setTimeout(() => {
            try {
                if (json && json !== '') {
                    if (isJsonString(json)) {
                        const id = Date.now()
                        let exist = false
                        Object.keys(localStorage).forEach(function (key) {
                            if (_.isEqual(json_value, JSON.parse(localStorage.getItem(key)))) exist = true
                        });
                        if (!exist) {
                            localStorage.setItem(id, JSON.stringify(json_value))
                            toast.success("Salvo. Acesse o histórico para visualizar!")
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }, 2000)

        return () => clearTimeout(saveJson)
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

    function openAttrModal(type = '') {
        setModalAttrOpen(true)
        setType(type)
    }

    function showHistory() {
        setHistory(
            <History
                setJson={setJson}
                json={json}
            />
        )
    }

    function clearHistory() {
        const localStorageIsEmpty = localStorage.length === 0;
        if (localStorageIsEmpty) {
            toast.success("O histórico já está limpo!")
        } else {
            localStorage.clear();
            toast.success("Limpo com sucesso!")
            showHistory()
        }
    }

    function changeColor() {
        if (theme === 'light') {
            setTheme('dark')
            setbtnColor('#fff')
            setbtnBackColor('#000')
            toast("Modo escuro ativado")
        } else {
            setTheme('light')
            setbtnColor('#000')
            setbtnBackColor('#fff')
            toast("Modo escuro desativado")
        }
    }

    return (
        <>
            <Toaster />
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div className='boxContent ms-4'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Histórico:
                        </Typography>
                        <Fab
                            size="small"
                            className='bgBlue me-4'
                            aria-label="add"
                            onClick={() => clearHistory()}
                        >
                            <CleaningServicesIcon />
                        </Fab>
                    </div>
                    <div>
                        {history}
                    </div>
                </Box>
            </Modal>
            <Modal
                open={modalAttrOpen}
                onClose={() => setModalAttrOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <div className='boxContent ms-4'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {type == 'attributes' ? 'Atributos' : 'Valores'} do json:
                        </Typography>
                    </div>
                    {
                        type == 'attributes' ?
                            <div className='boxContent ms-4'>
                                [
                                {Object.keys(formattedJson ?? '').join(',')}
                                ]
                            </div>
                            :
                            <div className='boxContent ms-4'>
                                [
                                {Object.values(formattedJson ?? '').join(',')}
                                ]
                            </div>
                    }
                </Box>
            </Modal >
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
                        <Fab
                            color='inherit'
                            style={{ marginRight: 5, backgroundColor: btnBackColor, color: btnColor }} size='small'
                            aria-label="add"
                            onClick={() => changeColor()}
                        >
                            <DarkModeIcon />
                        </Fab>
                        <Fab
                            className='bgBlue'
                            size='small'
                            aria-label="add"
                            onClick={() => openHistoryModal()}
                        >
                            <HistoryIcon />
                        </Fab>
                    </div>
                    <div style={{ width: '100%', height: '100%' }}>
                        {formattedJson &&
                            <JsonViewer
                                value={formattedJson}
                                theme={theme}
                            />
                        }
                    </div>
                </Grid>
            </Grid>
            <div style={{ marginLeft: '20px' }}>
                <Button
                    variant="contained"
                    onClick={() => openAttrModal('attributes')}
                    style={{
                        marginRight: '10px'
                    }}
                >
                    Gerar array dos atributos
                </Button>
                <Button
                    variant="contained"
                    onClick={() => openAttrModal('values')}
                >
                    Gerar array dos valores
                </Button>
            </div>
        </>
    )

}

export default Content;