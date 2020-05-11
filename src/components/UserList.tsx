import React, { useState } from 'react'
import { makeStyles, Grid, List, createStyles, Theme, ListItem, ListItemAvatar } from '@material-ui/core';
import { getAllUsers } from './Register';
import { UserDisplay } from './UserDisplay';
import { MenuBar } from './Menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

export function UserList() {
    const [allUsers] = useState(getAllUsers)

    const classes = useStyles();
    return (
        <Grid item xs={12} md={6}>
        <MenuBar /> 
        <div className={classes.demo}>
        <List dense={false}>
                    {allUsers.map(user => <UserDisplay id={user.id} />)}
            </List>
            </div>
        </Grid>
    )

}