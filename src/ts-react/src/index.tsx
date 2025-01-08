import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {V1, V2} from './tasks/event-loop-questions';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <V1/>
    </>
);