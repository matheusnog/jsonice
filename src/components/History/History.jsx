import React, { useEffect, useState } from 'react';
import { Fab, List, ListItem, ListItemButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer, toast } from 'react-toastify';

const History = ({ setJson }) => {

    const [arrayHistory, setArrayHistory] = useState([])

    useEffect(() => {
        setArrayHistory(Object.keys(localStorage))
    }, [])

    function loadJson(key) {
        setJson(localStorage.getItem(key))
        toast("Carregado com sucesso!")
    }

    function removeJson(key) {
        localStorage.removeItem(key)
        setArrayHistory(Object.keys(localStorage))
    }

    const notify = (message) => {
        toast(message, {
            position: 'bottom-right',
            autoClose: 2000,
            style: {
                backgroundColor: '#fff',
                color: '#000',
            },
        });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <List>
                {arrayHistory.length == 0 ?
                    <div className='text-center'>
                        <h5>Sem histórico</h5>
                    </div>
                    : arrayHistory.map((ak, index) => {
                        return localStorage.getItem(ak) ?
                            < ListItem key={"listitem" + ak} >
                                <ListItemButton
                                    key={"listitembutton" + ak}
                                    color="neutral"
                                    disabled={false}
                                    selected={false}
                                    variant="soft"
                                >
                                    <div style={{ width: '100%', overflow: 'hidden' }}>
                                        <span>{localStorage.getItem(ak)}</span>
                                    </div>
                                    <div style={{ marginLeft: 6, marginRight: 4 }}>
                                        <Fab
                                            size="small"
                                            color='success'
                                            aria-label="add"
                                            onClick={() => loadJson(ak)}
                                        >
                                            <CheckIcon />
                                        </Fab>
                                    </div>
                                    <div>
                                        <Fab
                                            size="small"
                                            color='error'
                                            aria-label="add"
                                            onClick={() => removeJson(ak)}
                                        >
                                            <DeleteIcon />
                                        </Fab>
                                    </div>
                                </ListItemButton>
                            </ListItem>
                            : <></>
                    })}
            </List >
        </>
    )

}

export default History;