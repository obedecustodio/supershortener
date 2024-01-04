import React from 'react'
import { Typography, TextField, Button, Alert, AlertTitle, Stack } from '@mui/material'

export const Body = () => {
    return (
        <div className='bg-black'>
            <div className="container">

                <Typography variant="h4" className='text-center p-4 text-white'>
                    Super Shortener
                </Typography>



                <div className="row">

                    <TextField
                        label="Your Long url"
                        inputProps={{ style: { color: 'white' } }}
                        variant="filled"
                        color="success"
                        focused />

                </div>

                <div className="row mt-5">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {/* <Alert severity="error" variant='outlined'>
                            <AlertTitle>Error</AlertTitle>
                            Thera was an error while trying to shrink your url!
                        </Alert> */}
                        {/* <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            This is a warning alert — <strong>check it out!</strong>
                        </Alert> */}
                        <Alert severity="info" variant='outlined'>
                            <AlertTitle>Info</AlertTitle>
                            Your short url will appear here
                        </Alert>
                        {/* <Alert severity="success" variant='filled'>
                            <AlertTitle>Success</AlertTitle>
                            Here is Your Short url
                        </Alert> */}
                    </Stack>
                </div>
                <div className="row mt-5 p-4">
                    <Button variant="contained" color="success">
                        Shrink
                    </Button>
                </div>
            </div>
        </div>
    )
}
