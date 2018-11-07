import React, { useRef, useState, useEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

function useAccordion() {
  const [currentIndex, setCurrentIndex] = useState();

  function setCurrent(newIndex) {
    setCurrentIndex(currentIndex === newIndex ? undefined : newIndex);
  }

  return [currentIndex, setCurrent];
}

// We don't want to re-render this component every time it receives new props
// We also pass second parameter to this function where we implement our own comparison
const AccordionPanel = React.memo(
  props => {
    console.log(props.label + " rendered");
    const containerRef = useRef();

    useEffect(() => {
      if (props.isOpen) {
        console.log(`scroll ${props.label} into view`);
        scrollIntoView(containerRef.current, { block: 'nearest', scrollMode: 'if-needed' });
      }
    });

    return (
      <div onClick={props.onClick} ref={containerRef}>
        <div className="accordion-label">{props.label}</div>
        {props.isOpen && <div>{props.content}</div>}
      </div>
    );
  }, // practically shouldComponentUpdate, but reversed
  (prevProps, nextProps) => prevProps.isOpen === nextProps.isOpen
);

function Accordion(props) {
  return <div>{props.children}</div>;
}

export {
  useAccordion,
  Accordion,
  AccordionPanel
};
