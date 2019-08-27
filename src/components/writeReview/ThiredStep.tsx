import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const ThiredStep: React.FC<any> = (props) => {
    const [reviewInput, setReviewInput] = useState('');
    const [rateStar, setRateStar] = useState(0);

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{marginBottom: "20px"}}>
                <Typography style={{ marginBottom: '40px', color: '#29487d' }} variant="button" gutterBottom>
                    Write A Review And Rate A Place
                </Typography>
            </div>


            <Typography variant="h6">
                {rateStar} / 5
            </Typography>
            <div style={{marginBottom: "35px"}}>
                <Rating
                    name="Rate"
                    value={rateStar}
                    onChange={(event, newValue) => {
                        setRateStar(newValue)
                    }}
                    precision={0.5}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
            </div>


            <div style={{marginBottom: "145px"}}>
                <TextField
                    style={{ width: '300px' }}
                    label="Write Your Review"
                    multiline
                    rows="6"
                    value={reviewInput}
                    onChange={(e) => { setReviewInput(e.target.value) }}
                    margin="normal"
                    variant="outlined"
                />
            </div>

            <Button variant="contained" color="primary" onClick={() => props.post(reviewInput, rateStar)} disabled={!reviewInput ? true : false}>
                Confirm
            </Button>
        </div>
    );
};

export default ThiredStep;