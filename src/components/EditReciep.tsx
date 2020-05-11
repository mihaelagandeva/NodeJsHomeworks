import React, { useState, FormEvent } from 'react'
import { getDate } from './Register';
import { Reciep } from '../interfaces/Reciep';
import { Redirect, useParams } from 'react-router-dom';
import { MenuBar } from './Menu';
import { Typography, Container, TextField, Button, makeStyles } from '@material-ui/core';
import { ProductsInput } from './ProductsInput';
import { TagsInput } from './TagsInput';
import {getAllRecieps} from './createReciep'

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

function getCurrReciep(id: string) {
    const allRecieps = getAllRecieps();
    for (var i = 0; i < allRecieps.length; i++) {
        if (allRecieps[i].id.localeCompare(id) === 0) {
            return allRecieps[i];
        }
    }
    return undefined;
}

export function getCurrReciepIndex(id: string) {
    const allRecieps = getAllRecieps();
    const reciep = getCurrReciep(id);
    for (var i = 0; i < allRecieps.length; i++) {
        if (allRecieps[i].id.localeCompare(reciep!.id) === 0) {
            return i;
        }
    }
    return -1;
}

export function EditReciep() {
    const { id } = useParams<{ id: string }>();
    const reciep = getCurrReciep(id)
    const [reciepName, setReciepName] = useState(reciep!.reciepName)
    const [shortDescription, setShortDescription] = useState(reciep!.shortDescription);
    const [time, setTime] = useState(reciep!.time);
    const [products, setProducts] = useState<string[]>(reciep!.products);
    const [picture, setPicture] = useState(reciep!.picture);
    const [longDescription, setLongDescription] = useState(reciep!.longDescription);
    const [tags, setTags] = useState<string[]>(reciep!.tags);
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
        const date = getDate();
        const index = getCurrReciepIndex(id);
        const currReciep = getCurrReciep(id);
        const reciep: Reciep = { id: currReciep!.id, authorId: currReciep!.authorId, reciepName, shortDescription, time, products, picture, longDescription, tags, creationDate: currReciep!.creationDate, lastModified: date }
        let allRecieps = getAllRecieps();
        allRecieps.splice(index, 1, reciep);
        localStorage.setItem(`recieps`, JSON.stringify(allRecieps));
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
                            Edit Reciepe
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
                                helperText={shortDescriptionError ? 'Description too long' : ''}
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
                                helperText={pictureError ? 'Field is required' : ''}
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
                                helperText={longDescriptionError ? 'Description too long' : ''}
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
                                type="submit" onClick={create} fullWidth variant="contained" color="primary" className={classes.submit}>Edit</Button>
                            :
                            <Button
                                type="submit" onClick={create} fullWidth variant="contained" color="primary" className={classes.submit}>Edit</Button>
                        }
                    </div>
                </Container>
            </>
        )

}
