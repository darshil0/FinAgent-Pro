"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { Bug, AlertCircle, Zap, Copy, X, AlertTriangle, Terminal, Check } from 'lucide-react';

interface ErrorData {
  id: string;
  message: string;
  stack?: string;
  timestamp: number;
  level: 'error' | 'warning' | 'info' | 'test-fail' | 'api-error';
  testName?: string;
  endpoint?: string;
}

export default function QaErrorReporter() {
  const [errors, setErrors] = useState<ErrorData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Use a ref to keep track of the count for the tab title
  const errorCountRef = useRef(0);

  const getErrorConfig = (level: ErrorData['level']) => {
    switch (level) {
      case 'error': return { Icon: AlertCircle, color: 'text-red-400 bg-red-500/10 border-red-500/30 shadow-red-500/5' };
      case 'test-fail': return { Icon: Bug, color: 'text-rose-400 bg-rose-500/10 border-rose-500/30 shadow-rose-500/5' };
      case 'api-error': return { Icon: AlertTriangle, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30 shadow-orange-500/5' };
      case 'warning': return { Icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-amber-500/5' };
      default: return { Icon: Zap, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30 shadow-sky-500/5' };
    }
  };

  const handleError = useCallback((event: ErrorEvent) => {
    const errorData: ErrorData = {
      id: crypto.randomUUID(),
      message: event.message || 'Unknown Runtime Error',
      stack: event.error?.stack || 'No stack trace provided',
      timestamp: Date.now(),
      level: event.message.toLowerCase().includes('test') ? 'test-fail' : 'error'
    };
    setErrors(prev => [errorData, ...prev.slice(0, 19)]);
  }, []);

  const handleUnhandledRejection = useCallback((event: PromiseRejectionEvent) => {
    const reason = event.reason;
    const errorData: ErrorData = {
      id: crypto.randomUUID(),
      message: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : '',
      timestamp: Date.now(),
      level: 'api-error',
      endpoint: 'Async Rejection'
    };
    setErrors(prev => [errorData, ...prev.slice(0, 19)]);
  }, []);

  useEffect(() => {
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [handleError, handleUnhandledRejection]);

  const copyErrorReport = (error: ErrorData) => {
    const report = `[FIN-AGENT-QA] ${new Date(error.timestamp).toISOString()}\nLEVEL: ${error.level}\nMSG: ${error.message}\nSTACK: ${error.stack}`;
    navigator.clipboard.writeText(report);
    setCopiedId(error.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (errors.length === 0) return null;

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-900/40 hover:bg-red-500 transition-transform hover:scale-110 active:scale-95"
      >
        <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] font-bold text-red-600 border-2 border-red-600">
          {errors.length}
        </div>
        <Bug className="h-6 w-6" />
      </button>

      {/* Error Console Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="flex h-[80vh] w-full max-w-4xl flex-col rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-4">
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-red-400" />
                <h2 className="text-lg font-bold text-white uppercase tracking-tighter">QA Error Logs</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setErrors([])} 
                  className="px-3 py-1 text-xs font-mono text-slate-500 hover:text-white transition-colors"
                >
                  [CLEAR ALL]
                </button>
                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Scrollable List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {errors.map(error => {
                const { Icon, color } = getErrorConfig(error.level);
                return (
                  <div key={error.id} className={`rounded-2xl border p-5 transition-colors ${color}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5" />
                        <span className="text-[10px] font-mono opacity-60">
                          {new Date(error.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="rounded bg-black/20 px-2 py-0.5 text-[10px] font-bold uppercase">
                          {error.level}
                        </span>
                      </div>
                      <button 
                        onClick={() => copyErrorReport(error)}
                        className="text-slate-400 hover:text-white"
                      >
                        {copiedId === error.id ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <h4 className="mt-3 font-mono text-sm font-bold text-white">{error.message}</h4>
                    {error.stack && (
                      <pre className="mt-3 max-h-32 overflow-y-auto rounded-lg bg-black/40 p-3 text-[10px] font-mono text-slate-400 border border-white/5">
                        {error.stack}
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
