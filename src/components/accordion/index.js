import React from 'react';

import { Accordion, AccordionPanel, useAccordion } from './Accordion';
import FoobarIpsum from "foobar-ipsum";

function AccordionScreen() {
  const panels = [...Array(100).keys()].map(e => `Panel number ${e}`);

  const [currentIndex, setCurrent] = useAccordion();

  return <Accordion>
    {panels.map((panel, index) => (
      <AccordionPanel
        key={index}
        label={panel}
        content={generateRandomText()}
        isOpen={currentIndex === index}
        onClick={() => setCurrent(index)}
      />
    ))}
  </Accordion>;
}

function generateRandomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function generateRandomText() {
  return new FoobarIpsum({
    size: {
      sentence: generateRandomNumber(100),
      paragraph: generateRandomNumber(10)
    }
  }).paragraph();
}

export default AccordionScreen;
