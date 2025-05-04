import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { useSpeedTest } from '../context/SpeedTestContext';
import { formatDate } from '../utils/formatters';

const TestHistory = () => {
  const { history, clearHistory } = useSpeedTest();

  if (history.length === 0) {
    return null;
  }

  const getSpeedRating = (speed) => {
    if (speed < 10) return 'Slow';
    if (speed < 30) return 'Average';
    if (speed < 50) return 'Good';
    return 'Excellent';
  };

  const getSpeedColor = (speed) => {
    if (speed < 10) return 'text-red-500';
    if (speed < 30) return 'text-orange-500';
    if (speed < 50) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Test History
        </h2>
        <button
          onClick={clearHistory}
          className="px-4 py-2 bg-red-600/20 text-red-400 rounded-md hover:bg-red-600/30 transition-colors flex items-center gap-1"
        >
          <Trash2 size={16} />
          Clear
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((test) => (
          <div
            key={test.id}
            className="bg-slate-800/50 rounded-xl p-5 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-sm text-slate-400">{formatDate(test.timestamp)}</p>
                <p className="text-xs text-slate-500">{test.isp} • {test.location}</p>
              </div>
              <div className={`text-sm font-semibold px-2 py-1 rounded-full bg-opacity-20 ${getSpeedColor(test.downloadSpeed)} bg-current`}>
                {getSpeedRating(test.downloadSpeed)}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div>
                <p className="text-xs text-slate-400">DOWNLOAD</p>
                <p className={`text-lg font-bold ${getSpeedColor(test.downloadSpeed)}`}>
                  {test.downloadSpeed.toFixed(1)} <span className="text-xs font-normal">Mbps</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">UPLOAD</p>
                <p className={`text-lg font-bold ${getSpeedColor(test.uploadSpeed)}`}>
                  {test.uploadSpeed.toFixed(1)} <span className="text-xs font-normal">Mbps</span>
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">PING</p>
                <p className="text-lg font-bold">
                  {test.ping} <span className="text-xs font-normal">ms</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestHistory;