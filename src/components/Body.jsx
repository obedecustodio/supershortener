import React from 'react'
import { Typography, TextField, Button, Alert, AlertTitle, Stack, Link } from '@mui/material'
import QRCode from 'react-qr-code'

export const Body = () => {
    return (
        <div className='bg-black'>
            <div className="container">

                <Typography variant="h4" className='text-center p-4 text-white'>
                    Super Shortener
                </Typography>



                <div className="row p-3">

                    <TextField
                        label="Your Long url"
                        inputProps={{ style: { color: 'white' } }}
                        variant="filled"
                        color="success"
                        focused />

                </div>

                <div className="row mt-3">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {/* <Alert severity="error" variant='outlined'>
                            <AlertTitle>Error</AlertTitle>
                            Thera was an error while trying to shrink your url!
                        </Alert> */}
                        {/* <Alert severity="warning">
                            <AlertTitle>Warning</AlertTitle>
                            This is a warning alert — <strong>check it out!</strong>
                        </Alert> */}
                        {/* <Alert severity="info" variant='outlined'>
                            <AlertTitle>Info</AlertTitle>
                            Your short url will appear here
                        </Alert> */}
                        <Alert sx={{ width: '100%' }} severity="success" variant='filled'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-10">
                                        {/* <AlertTitle> */}
                                            <Typography variant="h5" className='text-center p-4 text-white'>    
                                            </Typography>
                                        {/* </AlertTitle> */}
                                        <p>Here is Your short url: <Link href="#" color="inherit">werds</Link></p>
                                        <QRCode value='wa.me/+258870724804' />
                                    </div>
                                </div>
                            </div>
                        </Alert>
                    </Stack>
                </div>
                <div className="row mt-2 p-2">
                    <Button variant="contained" color="success">
                        Shrink
                    </Button>
                </div>
            </div>
        </div>
    )
}
