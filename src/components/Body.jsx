import React, { useState } from 'react'
import { Typography, TextField, Button, Alert, AlertTitle, LinearProgress, Stack, Link } from '@mui/material'
import QRCode from 'react-qr-code'

export const Body = () => {
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isFormError, setIsFormError] = useState(false)
    const [longurl, setLongurl] = useState('');
    const [shortUrl, setShorturl] = useState();
    const link = `https://supershortneerbackend.vercel.app/${shortUrl}`

    const getUrls = async () => {
        const req = await fetch('https://supershortneerbackend.vercel.app/urls')
        const data = await req.json()
        // setLongurl(data[data.length - 1].longurl)
        setShorturl(data[data.length - 1].shorturl)
        setIsSuccess(true)
        setIsLoading(false)
        setIsFormError(false)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setIsSuccess(false)
        if (longurl === '') {
            setIsFormError(true)
            return
        }
        setIsLoading(true)
        const url = {
            long: longurl
        }

        
        const dataJson = JSON.stringify(url)
    

        const req = await fetch('https://supershortneerbackend.vercel.app/url', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataJson
        }).then(res => {
            if (res.status != 200) {
                setIsError(true)
                setIsLoading(false)
                setLongurl('')
                return
            } else {
                setLongurl('')
                getUrls()
            }
        })

    }
    return (
        <div className='bg-black'>
            <div className="container">
                <Typography variant="h4" className='text-center p-4 text-white'>
                    Super Shortener
                </Typography>
                <div className="row p-3">

                    {
                        !isFormError ?
                        <TextField
                        label="Your Long url"
                        value={longurl}
                        inputProps={{ style: { color: 'white' } }}
                        variant="filled"
                        color="success"
                        onChange={(e) => { setLongurl(e.target.value); console.log(longurl) }}
                        focused /> :
                        <TextField
                        error
                        id="standard-error-helper-text"
                        value={longurl}
                        inputProps={{ style: { color: 'white' } }}
                        label="Error"
                        defaultValue="Hello World"
                        helperText="Invalid url. Try entering a valid url, eg: http://example.com"
                        variant="standard"
                        onChange={(e) => { setLongurl(e.target.value); console.log(longurl) }}
                    />
                    }
                   
                </div>

                <div className="row mt-3">
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {isLoading && <LinearProgress color="success" />}
                        {isError && <Alert severity="error" variant='outlined'>
                            <AlertTitle>Error</AlertTitle>
                            Thera was an error while trying to shrink your url!
                        </Alert>}
                        {!isSuccess && (!isError && <Alert severity="info" variant='outlined'>
                            <AlertTitle>Info</AlertTitle>
                            Your short url will appear here
                        </Alert>)}
                        {isSuccess && <Alert sx={{ width: '100%' }} severity="success" variant='filled'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-10">
                                        <Typography variant="h5" className='text-center p-4 text-white'>
                                        </Typography>
                                        <p>Here is Your short url: <Link href={link} color="inherit">{shortUrl}</Link></p>
                                        <QRCode value={link} />
                                    </div>
                                </div>
                            </div>
                        </Alert>}
                    </Stack>
                </div>
                <div className="row mt-2 p-2">
                    <Button variant="contained" color="success" onClick={handleFormSubmit}>
                        Shrink
                    </Button>
                </div>
            </div>
        </div>
    )
}
