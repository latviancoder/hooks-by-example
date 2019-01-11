import React, { useState } from 'react';
import { unstable_scheduleCallback } from 'scheduler';

const LargeList = ({ remainder }) => {
  return <ul>
    {[...Array(2000).keys()].map(n => {
      return (remainder === n % 2) && <li key={n}>{n}</li>;
    })}
  </ul>;
};

function Concurrent2() {
  const [query, setQuery] = useState('');
  const [remainder, setRemainder] = useState(0);

  const mode = window.localStorage.getItem('mode');

  return <div>
    <input
      type="text"
      value={query}
      onChange={(e) => {
        const value = e.target.value;
        const remainder = value.length % 2;
        setQuery(value);

        if (mode === 'concurrent') {
          unstable_scheduleCallback(() => {
            setRemainder(remainder);
          });
        } else {
          setRemainder(remainder);
        }
      }}
    />{' '}{query.length}
    <LargeList remainder={remainder}/>
  </div>;
}

export default Concurrent2;