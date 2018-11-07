import React, { useState, createContext } from "react";

const FormContext = createContext(null);

function MyFormLibrary({ children, initialValues, onSubmit, validate }) {
  const [values, updateValues] = useState(initialValues);
  const [errors, updateErrors] = useState({});

  function handleChange(name, value) {
    updateValues({
      ...values,
      [name]: value
    });
    updateErrors({
      ...errors,
      [name]: undefined
    });
  }

  async function submitForm() {
    try {
      validate && validate(values);
      await onSubmit(values);
    } catch (e) {
      updateErrors(convertErrors(e));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    submitForm();
  }

  function input(name) {
    return {
      value: values[name],
      onChange: (e) => handleChange(name, e.target.value)
    }
  }

  const ctx = {
    values,
    errors,
    handleSubmit,
    input
  };

  return <FormContext.Provider value={ctx}>
    {children}
  </FormContext.Provider>;
}

function convertErrors(yupError) {
  return yupError.inner
    .reduce((acc, cur) => {
      acc[cur.path] = cur.message;
      return acc;
    }, {});
}

export default MyFormLibrary;
export { FormContext };