import React, { useState, FormEvent } from 'react';
import {
    makeStyles,
    Button,
    TextField,
    Container,
    Typography,
} from '@material-ui/core';
import { Reciep } from '../interfaces/Reciep';
import { getDate, getGlobalId, incrementGlobalId } from './Register';
import { Redirect } from 'react-router-dom';
import { TagsInput } from './TagsInput';
import { ProductsInput } from './ProductsInput';
import { MenuBar } from './Menu';



export function getAllRecieps() {

    let values = (localStorage.getItem('recieps'));
    let result: Reciep[] = [];

    if (values !== null) {
        let currentRec = JSON.parse(values);
        currentRec.forEach((element: Reciep) => {
            result.push(element);
        });
    }
    return result;
}

function getCurrUser() {
    const user = localStorage.getItem('loggedUserId');
    if (user) {
        return JSON.parse(user);
    }
    return null
}

const useStyles = makeStyles(() => ({
        paper: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            width: '40%',
            height: '50%',
            left: '30%',
            top: '5%'
        },
        submit: {
            margin: '5px',
        },
    }));


export function CreateReciep() {
    const authorId = getCurrUser();
    const [reciepName, setReciepName] = useState('')
    const [shortDescription, setShortDescription] = useState('');
    const [time, setTime] = useState('');
    const [products, setProducts] = useState<string[]>([]);
    const [picture, setPicture] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [successfullyCreated, setSuccessfullyCreated] = useState(false);

    const [nameError, setNameError] = useState(false);
    const [shortDescriptionError, setShortDescriptionError] = useState(false);
    const [pictureError, setPictureError] = useState(false);
    const [longDescriptionError, setLongDescriptionError] = useState(false);
    const [hasError, setHasError] = useState(false);

    const selectedTags = (t: string[]) => {
        setTags(t);
    };
    const selectedProducts = (products: string[]) => {
        setProducts(products)
    }
    
    function create(event: FormEvent) {
        event.preventDefault();
        if (picture === "") {
            setPictureError(true)
            setHasError(true)
            return
        }
        let globalId = getGlobalId()
        const date = getDate();
        const reciep: Reciep = {id: globalId, authorId: authorId, reciepName, shortDescription, time, products, picture, longDescription, tags, creationDate: date, lastModified: date}
        let allRecieps = getAllRecieps();
        allRecieps.push(reciep);
        localStorage.setItem(`recieps`, JSON.stringify(allRecieps));
        incrementGlobalId()
        setSuccessfullyCreated(true)
    }

    
    const classes = useStyles();

    
    return successfullyCreated ? (
        <Redirect to="/reciep" />) : (
            <>
            <div>
                <MenuBar />
            </div>
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    New Reciep
                </Typography>
                <form className="form" noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="reciepName"
                        label="Title"
                                value={reciepName}
                                error={nameError}
                                helperText={
                                    nameError ? 'Name is too long' : ''
                                }
                                onChange={event => {
                                    setNameError(false)
                                    setHasError(false)
                                    setReciepName(event.target.value)
                                    if (event.target.value.length > 80) {
                                        setNameError(true)
                                        setHasError(true)
                                    }
                                }}
                        name="reciepName"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="shortDescription"
                        label="Short Description"
                                error={shortDescriptionError}
                                helperText={shortDescriptionError? 'Description too long' : ''}
                        value={shortDescription}
                                onChange={event => {
                                    setShortDescriptionError(false);
                                    setHasError(false);
                                    setShortDescription(event.target.value)
                                    if (event.target.value.length > 256) {
                                        setShortDescriptionError(true)
                                        setHasError(true)
                                    }
                                }}
                        name="shortDescription"
                    />
                   <ProductsInput selectedProducts={selectedProducts}> </ProductsInput>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="time"
                        label="Time"
                        value={time}
                        onChange={event => setTime(event.target.value)}
                        name="time"
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="picture"
                        label="Picture"
                                value={picture}
                                error={pictureError}
                                helperText={pictureError? 'Field is required' : ''}
                                onChange={event => {
                                    setPictureError(false);
                                    setHasError(false)
                                    setPicture(event.target.value)
                                    if (event.target.value.length === 0) {
                                        setPictureError(true)
                                        setHasError(true)
                                    }
                                }
                                }
                        name="picture"
                    />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="longDescription"
                                label="Long Description"
                                multiline
                                rows="5"
                                error={longDescriptionError}
                                helperText={longDescriptionError? 'Description too long' : ''}
                        value={longDescription}
                                onChange={event => {
                                    setLongDescriptionError(false)
                                    setHasError(false)
                                    setLongDescription(event.target.value)
                                    if (event.target.value.length > 512) {
                                        setLongDescriptionError(true)
                                        setHasError(true)
                                    }
                                }
                            }
                        name="longDesctiption"
                    /> 
                        <TagsInput selectedTags={selectedTags}></TagsInput>
                        </form>
                        {hasError ?
                        
                            <Button disabled
                                type="submit" onClick={create} fullWidth variant="contained" color="primary" className={classes.submit}>Create</Button>
                            :
                            <Button
                                type="submit" onClick={create} fullWidth variant="contained" color="primary" className={classes.submit}>Create</Button>
                        }
            </div>
                </Container>
                </>
    )

}
