import React, { useState } from 'react';
import './searchInput.scss';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';

const SearchInput = ({ userSearchInput }) => {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);

  const validate = (input) => {
    const letters = /^[a-zA-Z0-9 ]*$/;
    input.match(letters) ? userSearchInput(userInput) : setError(true);

    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  return (
    <div className="input_container">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search all the GIFs and Stickers"
          aria-label="Search all the GIFs and Stickers"
          aria-describedby="basic-addon2"
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={() => validate(userInput)}
          >
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <p className={error ? `error show` : `error`}>
        Only letters and numbers are allowed
      </p>
    </div>
  );
};

export default SearchInput;
