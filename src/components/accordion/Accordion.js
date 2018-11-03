import React, { useRef, createRef, forwardRef, useImperativeMethods, useState, useEffect } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

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
  }, []); // run once

  useEffect(() => {
    // Scroll current accordion panel into view
    if (currentIndex !== undefined) {
      refs[currentIndex].current.scrollIntoView();
    }
  }, [currentIndex]); // Run every time current index changes

  function setCurrent(newIndex) {
    setCurrentIndex(currentIndex === newIndex ? undefined : newIndex);
  }

  return [currentIndex, setCurrent, refs];
}

// We don't want to re-render this component every time it receives new props
// We also pass second parameter to this function where we implement our own comparison
const AccordionPanel = React.memo(
  forwardRef((props, ref) => {
    const containerRef = useRef();

    useImperativeMethods(ref, () => ({
      scrollIntoView: () => {
        scrollIntoView(containerRef.current, { block: 'nearest', scrollMode: 'if-needed' });
      }
    }));

    return <div onClick={props.onClick} ref={containerRef}>
      <div className="accordion-label">{props.label}</div>
      {props.isOpen &&
      <div>{props.content}</div>}
    </div>;
  }),
  // practically shouldComponentUpdate, but reversed
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