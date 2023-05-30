import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';

class History extends React.Component {
    render() {
        function returnHistory() {
            const rows = [];
            for (var i = 0; i < localStorage.length; i++) {
                rows.push(
                    <ListItem>
                        <ListItemButton
                            color="neutral"
                            disabled={false}
                            selected={false}
                            variant="soft"
                        >
                            <span>{localStorage.getItem(localStorage.key(i))}</span>
                        </ListItemButton>
                    </ListItem>
                );
            }
            return rows;
        }

        return (
            <List>
                {returnHistory()}
            </List>
        )
    }
}

export default History;