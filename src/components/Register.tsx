import React, { useState, FormEvent } from 'react';
import {
    Button,
    TextField,
    Container,
    makeStyles,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { User } from '../interfaces/User'
import { Redirect } from 'react-router-dom';

export function getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
}

export function getGlobalId() {
    let globalId = localStorage.getItem('id')
    if (globalId === null) {
        const initialvalue = 0;
        globalId = initialvalue.toString();
    }
    return globalId;
}

export function incrementGlobalId() {
    const globalId = getGlobalId();
    const newId = parseInt(globalId) + 1;
    localStorage.setItem('id', newId.toString())
}

export function getAllUsers() {

    let values = (localStorage.getItem('users'));
    let result: User[] = [];

    if (values !== null) {
        let currentRec = JSON.parse(values);
        currentRec.forEach((element: User) => {
            result.push(element);
        });
    }
    return result;
}

export function validatePassword(password: string) {
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/;
    if (password.match(paswd) && password.length>7) {
        return true;
    }
    return false;
}



export function Register() {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [createdUser, setCreatedUser] = useState(false);
    
    
    const [usernameError, setUsernameError] = useState(false)
    const [shortDescriptionError, setShortDescriptionError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false)
    const [hasError, setHasError] = useState(false);

    let userRole: string = '';
    if (window.location.href.includes('admin')) {
        userRole = 'admin';
    }
    else {
        userRole = 'user'
    }

    const useStyles = makeStyles(() => ({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            left: '35%',
            top: '20%'
        },
        submit: {
            margin: '5px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            width: '400px',
        },
        gender: {
            marginLeft: '15px'
        }
    }));

    const classes = useStyles();

    function submit(event: FormEvent) {
        event.preventDefault();
        const globalId = getGlobalId()
        const user: User = {id: globalId, name: name, gender: gender, username: username, password: password, shortDescription: shortDescription, pictureUrl: profilePicture, registrationDate: getDate(), role:userRole, status: 'active'}
        let allUsers = getAllUsers();
        allUsers.push(user);
        localStorage.setItem(`users`, JSON.stringify(allUsers));
        incrementGlobalId();
        setCreatedUser(true)
     }

    return createdUser ? (
        <Redirect to="/" />) :(
        <Container component="main" maxWidth="xs" className={classes.paper}>
          <Typography component="h1" variant="h5">
                Sign up
          </Typography>
                <form className={classes.form} noValidate onSubmit={submit}>
                <TextField
                    variant="outlined"
                        margin="normal"
                        required
                        id="name"
                        label="Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        name="name"
                        autoFocus
                    />
                    <FormControl>
                        <InputLabel className={classes.gender}>Gender</InputLabel>
                    <Select
                            id="gender"
                            value={gender}
                            variant="outlined"
                            onChange={event => setGender(event.target.value as string)}>
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="username"
                        label="Username"
                        value={username}
                        error={usernameError}
                        helperText={
                            ((usernameError) ? 'Username too long' : '')
                        }
                        onChange={event => {
                            setUsernameError(false);
                            setHasError(false);
                            setUsername(event.target.value)
                            if (username.length > 15) {
                                setUsernameError(true)
                                setHasError(true);
                            }
                        }}
                        name="username"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="password"
                        label="Password"
                        value={password}
                        error={passwordValidationError}
                        helperText={
                            passwordValidationError ? 'Password should be at least 8 symbols and contain at least 1 digit and 1 special character'
                                : ''
                        }
                        onChange={event => {
                            setPasswordValidationError(false);
                            setHasError(false);
                            setPassword(event.target.value)
                            if (!validatePassword(event.target.value)) {
                                setPasswordValidationError(true);
                                setHasError(true);
                            }
                        }
                        }
                        name="password"
                        type="password"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="shortDescription"
                        label="Short Description"
                        value={shortDescription}
                        error={shortDescriptionError}
                        helperText={shortDescriptionError ? 'Description is too long' : ''}
                        onChange={event => {
                            setShortDescriptionError(false)
                            setHasError(false);
                            setShortDescription(event.target.value)
                            if (shortDescription.length > 512) {
                                setShortDescriptionError(true)
                                setHasError(true);
                            }
                        }}
                        name="shortDescription"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        id="profilePicture"
                        label="Profile Picture URL"
                        value={profilePicture}
                        onChange={event => setProfilePicture(event.target.value)}
                        name="profilePicture"
                        />
                </form>
                {hasError ?
                    <Button disabled
                        type="submit" onClick={submit} fullWidth variant="contained" color="primary" className={classes.submit}>Sign up</Button>
                    :
                    <Button
                        type="submit" onClick={submit} fullWidth variant="contained" color="primary" className={classes.submit}>Sign up</Button>
                }
                <Link href="/">Already have an account? Sign in!</Link>
            
        </Container>
    )
}