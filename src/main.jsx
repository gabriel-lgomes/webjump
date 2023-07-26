import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.css';

import { CategoryProvider } from './context/CategoryContext.jsx';
import { ListProvider } from './context/ListContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CategoryProvider>
      <ListProvider>
        <FilterProvider>
          <App />
        </FilterProvider>
      </ListProvider>
    </CategoryProvider>
  </React.StrictMode>,
)
