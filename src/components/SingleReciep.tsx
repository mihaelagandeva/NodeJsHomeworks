import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { getAllRecieps } from './createReciep';
import { getAllUsers } from './Register';
import { Reciep } from '../interfaces/Reciep';
import { User } from '../interfaces/User';
import { CardActions, IconButton, Link } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { getCurrReciepIndex } from './EditReciep';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 500,
            margin: 10,
        },
        media: {
            maxHeight: '100%',
            maxWidth: '100%',
            height: 250,
            paddingTop: '56.25%', // 16:9
            objectFit: 'contain'
        },
        avatar: {
            backgroundColor: red[500],
        },
        delete: {
            marginLeft: 390,
        }
    }),
);

interface ReciepProps{
    id: string
}

function getReciep(id: string) : (Reciep | null) {
    const allRecieps = getAllRecieps();
    for (var i = 0; i < allRecieps.length; i++){
        if (allRecieps[i].id.localeCompare(id) === 0) {
            return allRecieps[i];
        }
    }
    return null;
}

function getAuthor(reciepId: string) : (User | null){
    const allAuthors = getAllUsers();
    const reciep = getReciep(reciepId)
    
    for (var i = 0; i < allAuthors.length; i++) {
        if (reciep !== null) {            
            if (allAuthors[i].id.localeCompare(reciep.authorId.toString()) === 0) {
                return allAuthors[i];
            }
        }
    }
    return null;
}



export function SingleReciep(props: ReciepProps) {
    const classes = useStyles()
    const [reciep] = useState(getReciep(props.id));
    const [author] = useState(getAuthor(props.id));

    
    function onDelete() {
        let allRecieps = getAllRecieps();
        const currReciepIndex = getCurrReciepIndex(props.id)
        allRecieps.splice(currReciepIndex, 1);
        localStorage.setItem(`recieps`, JSON.stringify(allRecieps));
        window.location.reload(false);
    }
    
    return (reciep && author) ?  (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    (author.pictureUrl !== '')?
                        <Avatar aria-label="recipe" className={classes.avatar} src={author.pictureUrl} />
                        :
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {author.username.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={reciep.reciepName}
                subheader={reciep.creationDate}
            />
            <CardMedia
                className={classes.media}
                image={reciep.picture}
                title={reciep.reciepName}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                {reciep.shortDescription}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <Link href={`/reciep/edit/${reciep.id}`}>
                        <CreateIcon />
                    </Link>
                </IconButton>
                <IconButton onClick={onDelete} className={classes.delete} aria-label="share">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    ) : (<div>
            No such reciep found
    </div>);
}