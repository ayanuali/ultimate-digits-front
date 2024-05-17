import React, { useState } from 'react';
import './PhoneNumberInput.css'; // Make sure to import the CSS file

const PhoneNumberInput = () => {
  const [isWords, setIsWords] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="container">
      <div className="toggle-container">
        <button
          className={!isWords ? 'toggle-button active' : 'toggle-button'}
          onClick={() => setIsWords(false)}
        >
          Numbers
        </button>
        <button
          className={isWords ? 'toggle-button active' : 'toggle-button'}
          onClick={() => setIsWords(true)}
        >
          Words
        </button>
      </div>
      <div className="input-container">
        <div className="icon">
          <span role="img" aria-label="Phone">
            📞
          </span>
        </div>
        <div className="phone-number">
          <p className="label">Phone number</p>
          <p className="number">+999 AVAX HOLDER</p>
        </div>
        <input
          type="text"
          placeholder="Enter 5 digits"
          maxLength="5"
          className="phone-input"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
        <button className="submit-button">LFG!</button>
      </div>
    </div>
  );
};

export default PhoneNumberInput;
