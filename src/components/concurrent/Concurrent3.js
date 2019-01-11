/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, Suspense } from 'react';
import { unstable_createResource } from 'react-cache';
import Spinner from 'reactjs-simple-spinner';
import { getUsersList } from './API';

const UsersResource = unstable_createResource(getUsersList);

function UsersBox({ id }) {
  const users = UsersResource.read(id);

  return <div css={css`
    padding: 10px 25px 10px 10px;
    margin: 10px;
    border: 1px solid #000;
  `}>
    <ul>
      {users.map(u => <li key={u.name}>{u.name}</li>)}
    </ul>
  </div>;
}

function Concurrent3() {
  const [areBoxesVisible, setBoxesVisible] = useState(false);

  return <>
    <button
      onClick={() => setBoxesVisible(true)}
    >
      Show Boxes
    </button>

    <Suspense fallback={<Spinner />}>
      <div hidden={!areBoxesVisible}>
        <UsersBox id={1} />
        <UsersBox id={2} />
        <UsersBox id={3} />
      </div>
    </Suspense>
  </>;
}

export default Concurrent3;