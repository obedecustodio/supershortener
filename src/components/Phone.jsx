import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');

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

  return (
    <div>
      {/* <label>Country</label>
      <Select
        value={selectedCountry}
        options={countryOptions}
        onChange={handleCountryChange}
      /> */}

      <label>Phone Number
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
  );
};

export default PhoneNumberInput;
