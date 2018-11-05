import React, { useContext, useEffect } from 'react';
import { object, string } from 'yup';

import MyFormLibrary, { FormContext } from './FormLibrary';

function MyForm() {
  const { values, errors, handleSubmit, input } = useContext(FormContext);

  useEffect(() => {
    console.info('values changed', values);
  }, [values]);

  return <form onSubmit={handleSubmit}>
    <div>
      <input
        placeholder="Email"
        autoComplete="off"
        {...input('email')}
      />
      {errors.email && <div>{errors.email}</div>}
    </div>
    <div>
      <input
        placeholder="Name"
        {...input('name')}
      />
      {errors.name && <div>{errors.name}</div>}
    </div>
    <input type="submit" value="Submit"/>

    <pre>
      {JSON.stringify({ values, errors }, null, 2)}
    </pre>
  </form>;
}

function Screen() {
  const validationSchema = object({
    name: string().required(),
    email: string().email().required()
  });

  return <MyFormLibrary
    initialValues={{ email: '', name: '' }}
    validate={(values) => {
      validationSchema.validateSync(values, { abortEarly: false });
    }}
    onSubmit={(values) => {
      alert('success');
    }}
  >
    <MyForm/>
  </MyFormLibrary>;
}

export default Screen;