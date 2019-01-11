import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import AccordionScreen from './components/accordion';
import FormLibraryScreen from './components/form-library';
import WindowWidthScreen from './components/window-width';
import TodoList from './components/todo-list';
import SortableScreen from "./components/sortable";
import Concurrent1 from "./components/concurrent/Concurrent1";
import Concurrent2 from "./components/concurrent/Concurrent2";
import Concurrent3 from "./components/concurrent/Concurrent3";

const Homepage = () => {
  return <div>use navigation on the left</div>;
};

function App() {
  const mode = window.localStorage.getItem('mode');

  return <Router>
    <div className="main">
      <div className="sync-async">
        <a
          css={css`font-weight: ${(!mode || mode === 'sync') && 'bold'};`}
          onClick={() => {
            window.localStorage.setItem('mode', 'sync');
            window.location.reload();
          }}
        >sync</a>
        {' / '}
        <a
          css={css`font-weight: ${mode === 'concurrent' && 'bold'};`}
          onClick={() => {
            window.localStorage.setItem('mode', 'concurrent');
            window.location.reload();
          }}
        >concurrent</a>
      </div>
      <nav className="sidebar">
        <div className="item">
          <Link className="link" to="/accordion">
            Accordion
          </Link>
          <span>
            Panels scroll into view if not fully visible when toggled.
              Using <pre>useEffect</pre>, <pre>useRef</pre>.
            </span>
        </div>
        <div className="item">
          <Link className="link" to="/form-library">
            Extremely basic form validation library
          </Link>
          <span>Pass state deeper using context, then read it using <pre>useContext</pre>. Heavily inspired by <pre>formik</pre>.</span>
        </div>
        <div className="item">
          <Link className="link" to="/window-width">
            Window width
          </Link>
          <span>Multiple <pre>useEffects</pre> are allowed.</span>
        </div>
        <div className="item">
          <Link className="link" to="/todo-list">
            Todo-list
          </Link>
          <span>Look mum, <pre>useReducer</pre> is almost Redux!</span>
        </div>
        <div className="item">
          <Link className="link" to="/sortable">
            Sortable
          </Link>
        </div>
        <div className="item">
          Concurrent React experiments
          <span css={{ display: 'flex' }}>
            <Link className="link" to="/concurrent1">One</Link>,{' '}
            <Link className="link" to="/concurrent2">Two</Link>,{' '}
            <Link className="link" to="/concurrent3">Three</Link>
          </span>
        </div>
      </nav>

      <div className="content">
        <Route path="/" exact component={Homepage} />
        <Route path="/accordion" component={AccordionScreen} />
        <Route path="/form-library" component={FormLibraryScreen} />
        <Route path="/window-width" component={WindowWidthScreen} />
        <Route path="/todo-list" component={TodoList} />
        <Route path="/sortable" component={SortableScreen} />
        <Route path="/concurrent1" component={Concurrent1} />
        <Route path="/concurrent2" component={Concurrent2} />
        <Route path="/concurrent3" component={Concurrent3} />
      </div>
    </div>
  </Router>;
}

export default App;
