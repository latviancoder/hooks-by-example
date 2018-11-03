import React, { useContext } from 'react';
import { object, string } from 'yup';

import MyFormLibrary, { FormContext } from './FormLibrary';

function MyForm() {
  const { values, errors, handleChange, handleSubmit } = useContext(FormContext);

  return <form onSubmit={handleSubmit}>
    <div>
      <input
        placeholder="Email"
        name="email"
        autoComplete="off"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email && <div>{errors.email}</div>}
    </div>
    <div>
      <input
        placeholder="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
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
    onValuesChanged={(values) => {
      console.info(values);
    }}
  >
    <MyForm/>
  </MyFormLibrary>;
}

export default Screen;