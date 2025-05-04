import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SpeedTestContext = createContext(undefined);

export const SpeedTestProvider = ({ children }) => {
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('speedTestHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);

  useEffect(() => {
    localStorage.setItem('speedTestHistory', JSON.stringify(history));
  }, [history]);

  const addResult = (result) => {
    setHistory(prev => [result, ...prev].slice(0, 20));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <SpeedTestContext.Provider
      value={{
        history,
        addResult,
        clearHistory,
        isLoading,
        setIsLoading,
        currentTest,
        setCurrentTest
      }}
    >
      {children}
    </SpeedTestContext.Provider>
  );
};

SpeedTestProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useSpeedTest = () => {
  const context = useContext(SpeedTestContext);
  if (context === undefined) {
    throw new Error('useSpeedTest must be used within a SpeedTestProvider');
  }
  return context;
};