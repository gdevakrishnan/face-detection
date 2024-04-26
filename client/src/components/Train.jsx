import React, { Fragment, useContext, useState } from 'react'
import { giveTraining } from '../services/serviceWorker';
import appContext from '../context/appContext';

function Train() {
  const { setMsg } = useContext(appContext);

  const initialState = {
    "name": ""
  }

  const [newPerson, setNewPerson] = useState(initialState);

  function processText(inputText) {
    let processedText = inputText.toLowerCase();
    processedText = processedText.replace(/\s+/g, '_');
    const specialCharactersRegex = /[^a-zA-Z0-9_]/g;
    const hasSpecialCharacters = specialCharactersRegex.test(processedText);

    return { processedText, hasSpecialCharacters };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const check = processText(newPerson.name);
    if (!check.hasSpecialCharacters) {
      setNewPerson({"name": check.processedText});
      giveTraining(newPerson)
        .then((response) => {
          setMsg(response.data.message);
          setNewPerson(initialState);
        })
        .catch((e) => console.log(e.message));
    } else {
      console.log("Please enter the name without special charachters");
    }
  }
  return (
    <Fragment>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="name"
          id="name"
          value={newPerson.name}
          onChange={(e) => setNewPerson({ ...newPerson, [e.target.id]: e.target.value })}
        />
        <input
          type="submit"
          value="Train"
          onSubmit={(e) => handleSubmit(e)}
        />
      </form>
      <p>* Please don't give white space for your name, instead you can use underscore for white spaces. Please don't use any special charachters</p>
    </Fragment>
  )
}

export default Train