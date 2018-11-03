import React, { useState, useEffect, createContext } from "react";

const FormContext = createContext(null);

function MyFormLibrary({ children, initialValues, onValuesChanged, onSubmit, validate }) {
  const [values, updateValues] = useState(initialValues);
  const [errors, updateErrors] = useState({});

  useEffect(() => {
    if (typeof onValuesChanged === 'function') {
      onValuesChanged(values);
    }
  }, [values]);

  function handleChange(e) {
    updateValues({
      ...values,
      [e.target.name]: e.target.value
    });
    updateErrors({
      ...errors,
      [e.target.name]: undefined
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

  const ctx = {
    values,
    errors,
    handleChange,
    handleSubmit
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