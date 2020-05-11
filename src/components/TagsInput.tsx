import React, { KeyboardEvent } from "react";
import { TextField, Box, Chip, makeStyles } from "@material-ui/core";



const unique = (value: string, index: number, self: string[]) => {
    return self.indexOf(value) === index
}


export function TagsInput(props: any) {
    const [tags, setTags] = React.useState<string[]>([]);
    const [tagValue, setTagValue] = React.useState('');

    const addTags = (event: KeyboardEvent) => {
        event.preventDefault();
        setTagValue(tagValue.trim())
        if (event.key === "Enter" && tagValue !== "" && tagValue !== " " || event.key === " " && tagValue !== "" && tagValue !== " ") {
            setTags([...tags, tagValue].filter(unique));
            props.selectedTags([...tags, tagValue].filter(unique));
            setTagValue('');
        }
    };

    const removeTags = (index: Number) => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const useStyles = makeStyles(() => ({
        tags: {
            width: '670px'
        },
        allTags: {
            maxHeight: '80px',
            overflow: 'auto'
        },
        chip: {
            marginTop: '5px'
        }
    }));

    const classes = useStyles();


    return (
        <div className="tags-input">
            <TextField
                label="tags"
                margin="normal"
                variant="outlined"
                value={tagValue}
                onChange={event => setTagValue(event.target.value)}
                onKeyUp={event => addTags(event)}
                placeholder="Add tags"
                className={classes.tags}
            />
            <h5>Tags: </h5>
            <ul className={classes.allTags}>
                {tags.map((tag, index) => (
                    <Box component="span" marginRight="10px" key={index}>
                        <Chip
                            className={classes.chip}
                            label={tag}
                            onDelete={() => removeTags(index)}
                        />
                    </Box>
                ))}
            </ul>
        </div>
    );
};
