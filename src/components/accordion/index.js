import React from 'react';

import { Accordion, AccordionPanel, useAccordion } from './Accordion';

function AccordionScreen() {
  const panels = [...Array(100).keys()].map(e => `Panel number ${e}`);

  const [currentIndex, setCurrent, refs] = useAccordion(panels.length);

  return <Accordion>
    {panels.map((panel, index) => (
      <AccordionPanel
        ref={refs && refs[index]}
        key={index}
        label={panel}
        isOpen={currentIndex === index}
        onClick={() => setCurrent(index)}
      />
    ))}
  </Accordion>;
}

export default AccordionScreen;
