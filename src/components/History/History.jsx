import React, { useEffect, useState } from 'react';
import { Fab, List, ListItem, ListItemButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

const History = ({ setJson }) => {

    const [arrayHistory, setArrayHistory] = useState([])

    useEffect(() => {
        setArrayHistory(Object.keys(localStorage))
    }, [])

    function loadJson(key) {
        setJson(localStorage.getItem(key))
    }

    function removeJson(key) {
        localStorage.removeItem(key)
        setArrayHistory(Object.keys(localStorage))
    }

    return (
        <List>
            {arrayHistory.map(ak => {
                return <ListItem key={"listitem" + ak}>
                    <ListItemButton
                        key={"listitembutton" + ak}
                        color="neutral"
                        disabled={false}
                        selected={false}
                        variant="soft"
                    >
                        <div>
                            <span>{localStorage.getItem(ak)}</span>
                        </div>
                        <div style={{ marginRight: 4 }}>
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
            })}
        </List>
    )

}

export default History;