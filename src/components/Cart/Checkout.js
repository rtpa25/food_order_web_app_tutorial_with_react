import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//VALIDATOR TO NAME, STREET, CITY
const isEmpty = (value) => value.trim().length === 0;
//VALIDATOR FOR POSTAL CODE
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    //NAME AND IT'S VALIDITY
    const enteredName = nameInputRef.current.value;
    const enteredNameIsValid = !isEmpty(enteredName);
    //STREET AND IT'S VALIDITY
    const enteredStreet = streetInputRef.current.value;
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    //POSTAL CODE AND IT'S VALIDITY
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredPostalCodeIsValid = isSixChars(enteredPostalCode);
    //STREET AND IT'S VALIDITY
    const enteredCity = cityInputRef.current.value;
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid
        ? true
        : false;

    //VALIDITY CHECK
    if (!formIsValid) {
      return;
    }
    //SUBMIT HANDLER
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  //NAME INPUT DIV DYNAMIC CLASS
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  //STREET INPUT DIV DYNAMIC CLASS

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;
  //POSTAL CODE INPUT DIV DYNAMIC CLASS

  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;
  //CITY INPUT DIV DYNAMIC CLASS

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postalCode (6 digits)</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city name</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
