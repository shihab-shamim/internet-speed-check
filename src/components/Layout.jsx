import React from 'react';
import PropTypes from 'prop-types';
import { Activity } from 'lucide-react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold">SpeedTest</h1>
          </div>
          <nav>
            {/* <ul className="flex gap-6">
              <li className="cursor-pointer hover:text-blue-400 transition-colors">Home</li>
              <li className="cursor-pointer hover:text-blue-400 transition-colors">History</li>
              <li className="cursor-pointer hover:text-blue-400 transition-colors">About</li>
            </ul> */}
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="container mx-auto px-4 py-6 border-t border-slate-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400">© 2025 SpeedTest. All rights reserved.</p>
          <ul className="flex gap-6 mt-4 md:mt-0">
            <li className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">Privacy</li>
            <li className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">Terms</li>
            <li className="text-slate-400 hover:text-blue-400 transition-colors cursor-pointer">Contact</li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;