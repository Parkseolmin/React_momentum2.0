import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { OptionProvider } from 'context/OptionContext';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from 'store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      placeholderData: keepPreviousData,
      onError: (error) => console.error('Query Error:', error),
      onSuccess: (data) => console.log('Query Success:', data),
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <OptionProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </OptionProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
