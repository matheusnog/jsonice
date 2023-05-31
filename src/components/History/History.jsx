import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';

const History = ({ setJson }) => {

    var arrayOfKeys = Object.keys(localStorage);
    console.log(arrayOfKeys)

    arrayOfKeys.map(ak => {
        console.log(localStorage.getItem(ak))
    })

    function loadJson(key) {
        setJson(localStorage.getItem(key))
    }

    return (
        <List>
            {arrayOfKeys.map(ak => {
                return <ListItem key={"listitem" + ak}>
                    <ListItemButton
                        key={"listitembutton" + ak}
                        color="neutral"
                        disabled={false}
                        selected={false}
                        variant="soft"
                        onClick={() => loadJson(ak)}
                    >
                        <span>{localStorage.getItem(ak)}</span>
                    </ListItemButton>
                </ListItem>
            })}
        </List>
    )

}

export default History;