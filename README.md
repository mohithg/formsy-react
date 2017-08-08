formsy-react-async
=================

Inspired from [Formsy-react](https://github.com/christianalfoni/formsy-react)

A form input builder and validator with support for async validations for React JS

| [How to use](#how-to-use) | [API](/API.md) | [Examples](/examples) |
|---|---|---|

## Install

  1. Download from this REPO and use globally (Formsy) or with requirejs
  2. Install with `npm install formsy-react-async` and use with browserify etc.
  3. Install with `bower install formsy-react-async`

## How to use

See [`examples` folder](/examples) for examples. [Codepen demo](http://codepen.io/semigradsky/pen/dYYpwv?editors=001).

Complete API reference is available [here](/API.md).

#### Formsy gives you a form straight out of the box

```jsx
  import Formsy from 'formsy-react';

  const MyAppForm = React.createClass({
    getInitialState() {
      return {
        canSubmit: false
      }
    },
    enableButton() {
      this.setState({
        canSubmit: true
      });
    },
    disableButton() {
      this.setState({
        canSubmit: false
      });
    },
    submit(model) {
      someDep.saveEmail(model.email);
    },
    render() {
      return (
        <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
          <MyOwnInput name="email" validations="isEmail" validationError="This is not a valid email" required/>
          <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </Formsy.Form>
      );
    }
  });
```

This code results in a form with a submit button that will run the `submit` method when the submit button is clicked with a valid email. The submit button is disabled as long as the input is empty ([required](/API.md#required)) or the value is not an email ([isEmail](/API.md#validators)). On validation error it will show the message: "This is not a valid email".

#### Building a form element (required)
```jsx
  import Formsy from 'formsy-react';

  const MyOwnInput = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
      this.setValue(event.currentTarget.value);
    },

    render() {
      // Set a specific className based on the validation
      // state of this component. showRequired() is true
      // when the value is empty and the required prop is
      // passed to the input. showError() is true when the
      // value typed is invalid
      const className = this.showRequired() ? 'required' : this.showError() ? 'error' : null;

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      const errorMessage = this.getErrorMessage();

      return (
        <div className={className}>
          <input type="text" onChange={this.changeValue} value={this.getValue()}/>
          <span>{errorMessage}</span>
        </div>
      );
    }
  });
```
The form element component is what gives the form validation functionality to whatever you want to put inside this wrapper. You do not have to use traditional inputs, it can be anything you want and the value of the form element can also be anything you want. As you can see it is very flexible, you just have a small API to help you identify the state of the component and set its value.

## Async Validation
```js
  
  Formsy.addValidationRule('asyncCall', async (values, value) => {
    const isValid = await apicall(value);
    return isVaild;
  });
  
```
And use the validation rule in your component as

```jsx
  <Component 
    validations="asyncCall"
    validationError="validation failed"
  />
```

## Examples
- For more examples and documentation refer [Formsy-react](https://github.com/christianalfoni/formsy-react)

## Contribute
- Fork repo
- `npm install`
- `npm run examples` runs the development server on `localhost:8080`
- `npm test` runs the tests

## License

[The MIT License (MIT)](/LICENSE)
