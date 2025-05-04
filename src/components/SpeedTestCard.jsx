import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import SpeedMeter from './SpeedMeter';
import { useSpeedTest } from '../context/SpeedTestContext';
import { runSpeedTest } from '../utils/speedTestUtils';

const SpeedTestCard = () => {
  const { isLoading, setIsLoading, addResult, currentTest, setCurrentTest } = useSpeedTest();
  const [testPhase, setTestPhase] = useState('ready');

  const handleStartTest = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setTestPhase('ping');
    setCurrentTest(null);
    
    try {
      const pingStart = Date.now();
      await runSpeedTest('ping');
      const pingResult = Date.now() - pingStart;
      
      setCurrentTest({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        downloadSpeed: 0,
        uploadSpeed: 0,
        ping: pingResult,
        jitter: Math.floor(Math.random() * 10) + 1,
        isp: 'Example ISP',
        location: 'Local Test'
      });
      
      setTestPhase('download');
      const downloadResult = await runSpeedTest('download');
      
      setCurrentTest(prev => prev ? {
        ...prev,
        downloadSpeed: downloadResult
      } : null);
      
      setTestPhase('upload');
      const uploadResult = await runSpeedTest('upload');
      
      const finalResult = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        downloadSpeed: downloadResult,
        uploadSpeed: uploadResult,
        ping: pingResult,
        jitter: Math.floor(Math.random() * 10) + 1,
        isp: 'Example ISP',
        location: 'Local Test'
      };
      
      setCurrentTest(finalResult);
      setTestPhase('complete');
      addResult(finalResult);
    } catch (error) {
      console.error('Speed test failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTestPhase('ready');
    setCurrentTest(null);
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl mx-auto w-full shadow-lg transition-all duration-500 hover:shadow-blue-500/20">
      <div className="flex flex-col items-center">
        <SpeedMeter 
          value={
            testPhase === 'download' ? currentTest?.downloadSpeed || 0 :
            testPhase === 'upload' ? currentTest?.uploadSpeed || 0 : 0
          }
          phase={testPhase}
          ping={currentTest?.ping || 0}
        />

        <div className="mt-8 w-full">
          {testPhase === 'complete' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 mb-1 text-sm">DOWNLOAD</p>
                <p className="text-3xl font-bold">{currentTest?.downloadSpeed.toFixed(2)} <span className="text-lg">Mbps</span></p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 mb-1 text-sm">UPLOAD</p>
                <p className="text-3xl font-bold">{currentTest?.uploadSpeed.toFixed(2)} <span className="text-lg">Mbps</span></p>
              </div>
              <div className="bg-slate-700/50 p-4 rounded-lg">
                <p className="text-slate-400 mb-1 text-sm">PING</p>
                <p className="text-3xl font-bold">{currentTest?.ping} <span className="text-lg">ms</span></p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-slate-300 mb-4">
                {testPhase === 'ready' && 'Click the button below to start testing your internet speed.'}
                {testPhase === 'ping' && 'Testing ping...'}
                {testPhase === 'download' && 'Measuring download speed...'}
                {testPhase === 'upload' && 'Measuring upload speed...'}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={testPhase === 'complete' ? handleReset : handleStartTest}
          disabled={isLoading && testPhase !== 'complete'}
          className={`mt-8 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${
            testPhase === 'complete'
              ? 'bg-slate-700 hover:bg-slate-600 text-white'
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'shadow-lg hover:shadow-blue-500/30'}`}
        >
          {testPhase === 'complete' ? (
            <>
              <RotateCcw className="h-5 w-5" />
              Test Again
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              {isLoading ? 'Testing...' : 'Start Test'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SpeedTestCard;