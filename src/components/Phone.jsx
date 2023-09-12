import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'



const PhoneNumberInput = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [shorturl, setShorturl] = useState();
    var [warn, setWarn] = useState(1);
    const link = `http://localhost:5000/${shorturl}`

    const handleGenerate = async () => {
        if (phoneNumber == '+258') {
            setWarn(4)
            return
          }
        setWarn(2)
        const number = {
            number: phoneNumber
        }
        const dataJson = JSON.stringify(number)
        const req = await fetch('http://localhost:5000/num', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataJson
        }).then(res => console.log(res))
        setPhoneNumber('+258')
        getUrls()
    }

    const getUrls = async () => {
        const req = await fetch('http://localhost:5000/urls')
        const data = await req.json()
        setShorturl(data[data.length - 1].shorturl)
        setWarn(3)
    }

    const condicao = (warn) => {
        switch (warn) {
            case 1:
                return <p className="text-info" id="warn">Your Whatsapp Url will appear Here</p>
                break;
            case 2:
                return <p>shortening...</p>
                break;
            case 3:
                return <span className="d-flex justify-content-between">
                    <p>Your short url: <a href={link} className="text-white" target="_blank" >{shorturl}</a></p>
                    <button className="btn btn-primary" onClick={copy}><font-awesome-icon icon="fa-solid fa-clone" /><FontAwesomeIcon icon={faClone} fade /></button>
                </span>
                break;
            case 4:
                return <p className="text-danger">Please insert your phone number!</p>
                break;
            default:
                break;
        }
    }

    function copy(){
        let copyText = `https://supershortneerbackend.vercel.app/url/${shorturl}`
    
        const txta = document.createElement("textarea")
        txta.value = copyText
        document.body.appendChild(txta)
        txta.select()
        document.execCommand("copy")
        alert("Short url copied to clipboard")
        document.body.removeChild(txta)
      }
    return (
        <div className='container'>
            <h2 className="text-secondary text-center">Whatsapp shorturl</h2>
            <div className="row">
                <label>Phone Number</label>
                <div className="col-lg-10 col-md-10 col-sm-10">
                    <PhoneInput
                        className="text-black form-control col-5 mr-2 mb-3"
                        country={'mz'}
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                        inputProps={{
                            required: true,
                        }}
                    />
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2">
                    <button className='btn btn-primary mb-3' onClick={handleGenerate}>generate</button>
                </div>
            </div>
            <div className="row">
                <div className="alert alert-secondary">
                    {condicao(warn)}
                </div>
            </div>
        </div>

    );
};

export default PhoneNumberInput;
