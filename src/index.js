import React from 'react';
import { unstable_createRoot } from 'react-dom';
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = unstable_createRoot(container);
root.render(<App />);

