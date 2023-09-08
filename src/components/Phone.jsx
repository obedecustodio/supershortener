import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClone } from '@fortawesome/free-solid-svg-icons'



const PhoneNumberInput = () => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const link = `http://localhost:5000/num/${phoneNumber}`

    // Sample country options for the select component
    const countryOptions = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        // Add more countries as needed
    ];

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        console.log(phoneNumber)
        console.log(selectedCountry)
    };

    const handleGenerate = async () => {
        const number = {
            number: phoneNumber
        }
        const dataJson = JSON.stringify(number)
        const req = await fetch('http://localhost:5000/num', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataJson
        }).then(res => console.log(res))
    }
    return (
        <div>
            <h2 className="text-secondary text-center">Whatsapp shorturl</h2>
            <div className="row mb-3">
            <div className="col-10">
                <label>
                    Phone Number
                    <PhoneInput
                        className="text-black"
                        country={'mz'}
                        value={phoneNumber}
                        onChange={(value) => setPhoneNumber(value)}
                        inputProps={{
                            required: true,
                        }}
                    />
                </label>
            </div>
            <div className="col-2">
                <button className='btn btn-primary mt-4' onClick={handleGenerate}>generate</button>
            </div>
            </div>
            <div className="alert alert-secondary">

          <p className="text-info" id="warn">Your Whatsapp Url will appear Here</p>
          <p id="on">shortening...</p>

          <span className="d-flex justify-content-between">
            <p>Your short url: <a href='#' className="text-white" target="_blank" >oi</a></p>
            <button className="btn btn-primary"><font-awesome-icon icon="fa-solid fa-clone" /><FontAwesomeIcon icon={faClone} fade /></button>
          </span>

        </div>
        </div>

    );
};

export default PhoneNumberInput;
