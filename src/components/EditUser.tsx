import React, { useState, FormEvent } from 'react'
import { getAllUsers, validatePassword } from './Register';
import { Redirect, useParams } from 'react-router-dom';
import { MenuBar } from './Menu';
import { Typography, Container, TextField, Button, makeStyles, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { getUser, getCurrUserIndex } from './UserDisplay';
import { User } from '../interfaces/User';

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



export function EditUser() {
    const { id } = useParams<{ id: string }>();
    const user = getUser(id)
    const [username, setUsername] = useState(user!.username);
    const [name, setName] = useState(user!.name)
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState(user!.gender);
    const [profilePicture, setProfilePicture] = useState(user!.pictureUrl);
    const [shortDescription, setShortDescription] = useState(user!.shortDescription);
    const [status, setStatus] = useState(user!.status);
    const [successfullyEdited, setSuccessfullyEdited] = useState(false);

    const [usernameError, setUsernameError] = useState(false)
    const [shortDescriptionError, setShortDescriptionError] = useState(false);
    const [passwordValidationError, setPasswordValidationError] = useState(false)
    const [hasError, setHasError] = useState(false);

    function submit(event: FormEvent) {
        event.preventDefault();
        const index = getCurrUserIndex(id);
        const currUser = getUser(id);
        const user: User = { id: currUser!.id, name: name, gender: gender, username: username, password: password, shortDescription: shortDescription, pictureUrl: profilePicture, registrationDate: currUser!.registrationDate, role: currUser!.role, status: currUser!.status }
        let allUsers = getAllUsers();
        allUsers.splice(index, 1, user)
        localStorage.setItem(`users`, JSON.stringify(allUsers));
        setSuccessfullyEdited(true)
    }


    const classes = useStyles();


    return successfullyEdited ? (
        <Redirect to="/users" />) : (
            <>
                <div>
                    <MenuBar />
                </div>
                <Container component="main" maxWidth="xs" className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Edit User
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
                        <FormControl>
                            <InputLabel className={classes.gender}>Status</InputLabel>
                            <Select
                                id="status"
                                value={status}
                                variant="outlined"
                                onChange={event => setStatus(event.target.value as string)}>
                                <MenuItem value={'active'}>Active</MenuItem>
                                <MenuItem value={'suspended'}>Suspended</MenuItem>
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
                            type="submit" onClick={submit} fullWidth variant="contained" color="primary" className={classes.submit}>Edit</Button>
                        :
                        <Button
                            type="submit" onClick={submit} fullWidth variant="contained" color="primary" className={classes.submit}>Edit</Button>
                    }
                 </Container>
            </>
        )

}
