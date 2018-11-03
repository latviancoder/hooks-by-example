import React, { useReducer, useState } from 'react';
import produce from 'immer';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return produce(state, (draftState) => {
        draftState[action.payload].isCompleted = !draftState[action.payload].isCompleted;
      });
    case 'add':
      return produce(state, (draftState) => {
        draftState.push({ label: action.payload });
      });
    default:
      return state;
  }
}

function Todo({ isCompleted, label, onChange }) {
  return <p>
    <label style={{
      textDecoration: isCompleted && 'line-through'
    }}>
      <input
        type="checkbox"
        checked={isCompleted || false}
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  </p>
}

function TodoList() {
  const todos = [
    { label: 'Do something' },
    { label: 'Buy dinner' }
  ];

  const [state, dispatch] = useReducer(reducer, todos);
  const [newTodo, setNewTodo] = useState('');

  return <>
    {state.map((todo, i) => (
      <Todo
        key={i}
        {...todo}
        onChange={() => dispatch({ type: 'toggle', payload: i })}
      />
    ))}
    <input
      type="text"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
    />
    <button onClick={() => {
      dispatch({ type: 'add', payload: newTodo });
      setNewTodo('');
    }}>
      Add
    </button>
  </>;
}

export default TodoList;