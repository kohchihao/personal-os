import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { PrivacyProvider } from './context/PrivacyProvider.tsx';
import queryClient from './utils/reactQuery.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrivacyProvider>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <Notifications />
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </PrivacyProvider>
  </StrictMode>
);
