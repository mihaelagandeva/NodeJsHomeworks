import React, { KeyboardEvent,useState } from "react";
import { TextField, Box, Chip, makeStyles, IconButton } from "@material-ui/core";
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';



const unique = (value: string, index: number, self: string[]) => {
    return self.indexOf(value) === index
}


export function ProductsInput(props: any) {
    const [products, setProducts] = useState<string[]>([]);
    const [productValue, setProductValue] = useState('');

    const addProducts = (event: KeyboardEvent) => {
        event.preventDefault();
        if (event.key === "Enter" && productValue !== "" && productValue !== " ") {
            setProducts([...products, productValue].filter(unique));
            props.selectedProducts([...products, productValue].filter(unique));
            setProductValue('');
        }
    };

    const removeProducts = (index: Number) => {
        setProducts([...products.filter(product => products.indexOf(product) !== index)]);
    };


    const useStyles = makeStyles(() => ({
        root: {
            display: 'flex',
            alignItems: 'center',
            width: 670,
        },
        products: {
            width: '670px'
        },
        allProducts: {
            maxHeight: '100px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
        },
        chip: {
            marginTop: '5px'
        },
        iconButton: {
            padding: 10,
        },
    }));

    const classes = useStyles();


    return (
        <>
        <div className={classes.root}>
            <TextField
                label="Products"
                margin="normal"
                variant="outlined"
                value={productValue}
                onChange={event => setProductValue(event.target.value)}
                onKeyUp={event => addProducts(event)}
                placeholder="Add tags"
                className={classes.products}
            />
                <IconButton onClick={() => {
                        setProducts([...products, productValue].filter(unique));
                        props.selectedProducts([...products, productValue].filter(unique));
                        setProductValue('');
                }} className={classes.iconButton}>
                <AddCircleOutlineSharpIcon />
            </IconButton>

        </div>
            <div>
                <h5> Products: </h5>
            <ul className={classes.allProducts}>
                {products.map((product, index) => (
                    <Box component="span" marginRight="10px" key={index}>
                        <Chip
                            className={classes.chip}
                            label={product}
                            onDelete={() => removeProducts(index)}
                            size='medium'
                        />
                    </Box>
                ))}
                </ul>
            </div>
            </>
    );
};
