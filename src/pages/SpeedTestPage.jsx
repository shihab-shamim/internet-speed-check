import React from 'react';
import SpeedTestCard from '../components/SpeedTestCard';
import TestHistory from '../components/TestHistory';

const SpeedTestPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Test Your Internet Speed</h1>
        <p className="text-slate-300 text-lg">
          Check your connection's download speed, upload speed, and ping with our easy-to-use speed test tool.
        </p>
      </div>
      
      <SpeedTestCard />
      
      <TestHistory />
    </div>
  );
};

export default SpeedTestPage;