import React, { useEffect } from 'react';

import useWindowWidth from './useWindowWidth';

const Index = () => {
  let width = useWindowWidth();

  useEffect(() => {
    // do something when width changes
  }, [width]);

  return <div id="scroll">{width}</div>;
};

export default Index;