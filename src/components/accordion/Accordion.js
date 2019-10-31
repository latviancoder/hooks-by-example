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
    const { label, onClick, isOpen, content } = props
    console.log(label + " rendered");
    const containerRef = useRef();

    useEffect(() => {
      console.log(`scroll ${label} into view`);
      scrollIntoView(containerRef.current, { block: 'nearest', scrollMode: 'if-needed' });
    }, [isOpen]);

    return (
      <div onClick={onClick} ref={containerRef}>
        <div className="accordion-label">{label}</div>
        {isOpen && <div>{content}</div>}
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
