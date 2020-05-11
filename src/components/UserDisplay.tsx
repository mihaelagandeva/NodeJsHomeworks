import React, { useState } from 'react'
import { getAllUsers } from './Register';
import { User } from '../interfaces/User';
import { ListItem, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Link } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';


export function getUser(id: string): (User | null) {
    const allUsers = getAllUsers();
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].id.localeCompare(id) === 0) {
            return allUsers[i];
        }
    }
    return null;
}

export function getCurrUserIndex(id: string) {
    const allUsers = getAllUsers();
    const user = getUser(id);
    for (var i = 0; i < allUsers.length; i++) {
        if (allUsers[i].id.localeCompare(user!.id) === 0) {
            return i;
        }
    }
    return -1;
}

interface UserProps{
    id: string;
}

export function UserDisplay(props: UserProps) {
    const [currentUser] = useState(getUser(props.id));

    function onDelete() {
        let allUsers = getAllUsers();
        const currUserIndex = getCurrUserIndex(props.id)
        allUsers.splice(currUserIndex, 1);
        localStorage.setItem(`users`, JSON.stringify(allUsers));
        window.location.reload(false);
    }

    return currentUser? (
        <ListItem>
                <Avatar aria-label="recipe"  src={currentUser.pictureUrl} />
            <ListItemText
                primary={currentUser.username}
            />
            <ListItemSecondaryAction>
                <IconButton onClick={onDelete} edge="end" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="add to favorites">
                    <Link href={`/user/edit/${currentUser.id}`}>
                        <CreateIcon />
                    </Link>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    ) : (
            <p> No such user</p>
    )
}