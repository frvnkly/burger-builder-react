import React, { Component } from 'react';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,  
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,  
        },
        valid: false,
        touched: false,
      },
    },
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) 
      isValid = value.trim() !== '' && isValid;
    if (rules.minLength)
      isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength)
      isValid = value.length <= rules.maxLength && isValid;
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updateControls = { 
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation),
        touched: true,
      },
    };
    this.setState({ controls: updateControls });
  }

  render() {
    const formElementsArray =[];
    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      })
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        value={formElement.config.value}
        changed={event => this.inputChangedHandler(event, formElement.id)} />
    ));

    return (
      <div className={classes.Auth}>
        <form>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
      </div>
    );
  }
}

export default Auth;