// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './styles/index.scss'


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//     <App />
// );

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
import './styles/index.scss'

export { default as Button } from './components/Button'
export { default as Menu } from './components/Menu'
export { default as AutoComplete } from './components/AutoComplete'
export { default as Icon } from './components/Icon'
export { default as Input } from './components/Input'
export { default as Progress } from './components/Progress'
export { default as Transition } from './components/Transition'
export { default as Upload } from './components/Upload'
export { default as Form } from './components/Form'