import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import { CookiesProvider } from 'react-cookie';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<CookiesProvider defaultSetOptions={{ path: '/' }}>
<Main />
    </CookiesProvider>
  
);
/* <React.StrictMode>
    <Main />
  </React.StrictMode> */

