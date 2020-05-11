import React, { useState, useEffect } from 'react'
import { SingleReciep } from './SingleReciep'
import { getAllRecieps } from './createReciep'
import { makeStyles, GridList } from '@material-ui/core';
import { MenuBar } from './Menu';

const useStyles = makeStyles(() => ({
    paper: {
        display: 'flex',
        flexDirection: 'row',
        margin: 10,
    },
}));

export function AllRecieps() {
    const [allRecieps] = useState(getAllRecieps)


    const classes = useStyles();
    return (allRecieps.length >0)? (
        <>
        <MenuBar />
            <div className={classes.paper}>
                <GridList cellHeight={200} spacing={4}>
                    {allRecieps.map(reciep => <SingleReciep key={reciep.id} id={reciep.id} />)}
                </GridList>
            </div>
        </>
    ) :
        (
            <>
                <MenuBar /> 
                <p>No reciepes to view</p>
            </>
        )
} 