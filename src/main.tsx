import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './scss/main.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LenisProvider } from './Hooks/LenisProvider';

createRoot(document.getElementById('lenis-root')!).render(
  <LenisProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </LenisProvider>
);
