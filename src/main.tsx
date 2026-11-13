import { createRoot } from 'react-dom/client';
import './scss/main.scss';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { LenisProvider } from './Hooks/LenisProvider';

createRoot(document.getElementById('lenis-root')!).render(
  <LenisProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </LenisProvider>
);
