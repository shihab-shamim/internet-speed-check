export interface TestResult {
    id: string;
    timestamp: string;
    downloadSpeed: number; // in Mbps
    uploadSpeed: number; // in Mbps
    ping: number; // in ms
    jitter: number; // in ms
    isp: string;
    location: string;
  }