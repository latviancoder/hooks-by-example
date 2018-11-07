import React from 'react';
import Sortable, { useSortableElement, useSortable } from './Sortable';

function Item(props) {
  // The library needs DOM nodes of every single item we want to reorder
  // This custom hook will add React ref to the element and then push respective DOM node to the array on nodes
  return <div {...useSortableElement()}>{props.children}</div>;
}

function List() {
  // We pass array of items to custom hook which will 1) reorder them after every 'dragEnd' 2) automatically update our list
  // There is no "onSortingEnded" callback and there is no need to use setState. We are basically saying:
  // "Hey, I don't want to think about this, just do the necessary stuff and update my component"
  const items = useSortable(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);

  return items.map((item, i) => <Item key={i}>{item}</Item>);
}

function Test() {
  // This wrapper will provide all child components with Sortable context
  // Hooks do not share any state between components, so this is important
  return <Sortable>
    <List/>
  </Sortable>;
}

export default Test;