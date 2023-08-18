import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';
import { AuthContextProvider } from './context/AuthContext';
import { ReserveContextProvider } from './context/ReserveContext';
import { SearchContextProvider } from './context/SearchContext';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchContextProvider>
        <ReserveContextProvider>
          <App />
        </ReserveContextProvider>
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);