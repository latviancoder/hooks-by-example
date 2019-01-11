import React, { memo, useState, useEffect } from 'react';

const Clocks = memo(function() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setDate(new Date()),
      100
    );
    return () => clearInterval(interval);
  }, []);

  return <div>
    {[...Array(5000).keys()].map(i => (
      <li key={i}>
        {date.toString()}
      </li>
    ))}
  </div>;
});

function Concurrent1() {
  const [inputValue, setInputValue] = useState('');

  return <div>
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
    {' '}{inputValue.length} <br /> <br />
    <Clocks />
  </div>;
}

export default Concurrent1;