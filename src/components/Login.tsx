import React, { useState } from 'react';
import {
    Button,
    TextField,
    Container,
    makeStyles,
    Typography,
    Snackbar,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { User } from '../interfaces/User';
import { getDate, getAllUsers } from './Register';
import { Redirect } from 'react-router-dom';

function generatePrimaryIdCounter() {
    let id = localStorage.getItem('id')
    let initialvalue = 0;
    if (id === null) {
        localStorage.setItem('id', initialvalue.toString())
    }
}

export function Login() {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [userExists, setUserExists] = useState(false);
    let userStatusActive = false;

    generatePrimaryIdCounter();


    const useStyles = makeStyles(() => ({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            width: '20%',
            height: '50%',
            left: '40%',
            top: '30%'
        },
        submit: {
            margin: '5px',
        }
    }));


    function login() {
        const allUsers = getAllUsers();
        let index = 0;

        while (!userExists && index < allUsers.length) {
            let currUser = allUsers[index];
            if (currUser.username === username && currUser.password === password) {
                setUserExists(true)
                if (currUser.status === 'active') {
                    userStatusActive = true;
                    const date = getDate();
                    const user: User = { id: currUser.id, name: currUser.name, gender: currUser.gender, username: currUser.username, password: currUser.password, shortDescription: currUser.shortDescription, pictureUrl: currUser.pictureUrl, registrationDate: currUser.registrationDate, role: currUser.role, status: currUser.status, loginDate: date }
                    localStorage.setItem('loggedUserId', JSON.stringify(user.id))
                    return;
                }
                else {
                    console.log('User is suspended or deleted')
                    return;
                }
            }
            index++;
        }
        if (!userExists) {
            alert('No such user exists');
        }
    }

    const classes = useStyles();

    return userExists ? (<Redirect to='/reciep' />) : (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in
          </Typography>
                <form className="form" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        value={username}
                        onChange={event => setUsername(event.target.value)}
                        name="username"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        name="password"
                        type="password"
                    />
                </form>
                <Button
                    type="submit" fullWidth onClick={login} variant="contained" color="primary" className={classes.submit}>Log In</Button>
                <Link href="/register">Don't have an account? Sign up!</Link>
            </div>
        </Container>
    )

}
