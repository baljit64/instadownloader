export type LogLevel = 'info' | 'warn' | 'error';

export interface RequestLogger {
  info: (message: string, context?: Record<string, unknown>) => void;
  warn: (message: string, context?: Record<string, unknown>) => void;
  error: (message: string, context?: Record<string, unknown>) => void;
}

function writeLog(level: LogLevel, message: string, context?: Record<string, unknown>) {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context ?? {}),
  };

  const line = JSON.stringify(payload);

  if (level === 'error') {
    console.error(line);
    return;
  }

  if (level === 'warn') {
    console.warn(line);
    return;
  }

  console.log(line);
}

export function createRequestLogger(
  requestId: string,
  baseContext: Record<string, unknown> = {}
): RequestLogger {
  return {
    info: (message, context) =>
      writeLog('info', message, { requestId, ...baseContext, ...(context ?? {}) }),
    warn: (message, context) =>
      writeLog('warn', message, { requestId, ...baseContext, ...(context ?? {}) }),
    error: (message, context) =>
      writeLog('error', message, { requestId, ...baseContext, ...(context ?? {}) }),
  };
}
