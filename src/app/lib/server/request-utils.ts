import { randomUUID } from 'crypto';
import type { NextRequest } from 'next/server';

export function getRequestId(request: NextRequest): string {
  const incomingId = request.headers.get('x-request-id');
  return incomingId?.trim() || randomUUID();
}

export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = request.headers.get('x-real-ip')?.trim();
  if (realIp) {
    return realIp;
  }

  return (request as { ip?: string }).ip ?? 'unknown';
}
