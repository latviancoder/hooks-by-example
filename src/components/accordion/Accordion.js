import React, { useRef, createRef, useImperativeMethods, useState, useEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import FoobarIpsum from 'foobar-ipsum';

function useAccordion(panelsCount) {
  const [currentIndex, setCurrentIndex] = useState();
  const [refs, setRefs] = useState();

  // This part is smelly
  // https://github.com/facebook/react/issues/14072
  // TODO rewrite
  useEffect(() => {
    let refs = {};
    for (let i = 0; i <= panelsCount; i++) {
      refs[i] = createRef();
    }
    setRefs(refs);
  }, []);

  useEffect(() => {
    // Scroll current accordion panel into view
    if (currentIndex !== undefined) {
      refs[currentIndex].current.scrollIntoView();
    }
  }, [currentIndex]);

  function setCurrent(newIndex) {
    setCurrentIndex(currentIndex === newIndex ? undefined : newIndex);
  }

  return [currentIndex, setCurrent, refs];
}

const AccordionPanel = React.forwardRef((props, ref) => {
  const containerRef = useRef();
  const textRef = useRef();

  useImperativeMethods(ref, () => ({
    scrollIntoView: () => {
      scrollIntoView(containerRef.current, { block: 'nearest', scrollMode: 'if-needed' });
    }
  }));

  return <div onClick={props.onClick} ref={containerRef}>
    <div className="accordion-label">{props.label}</div>
    {props.isOpen &&
    <div>{generateRandomText()}</div>}
  </div>;
});

function Accordion(props) {
  return <div>{props.children}</div>;
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

export {
  useAccordion,
  Accordion,
  AccordionPanel
};