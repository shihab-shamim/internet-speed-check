import React from 'react';
import { SpeedTestProvider } from './context/SpeedTestContext';
import Layout from './components/Layout';
import SpeedTestPage from './pages/SpeedTestPage';

function App() {
  return (
    <SpeedTestProvider>
      <Layout>
        <SpeedTestPage />
      </Layout>
    </SpeedTestProvider>
  );
}

export default App;