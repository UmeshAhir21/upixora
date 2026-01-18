interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10);
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);

export function rateLimit(ip: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = ip;

  if (!store[key] || now > store[key].resetTime) {
    store[key] = {
      count: 1,
      resetTime: now + WINDOW_MS,
    };
    return {
      allowed: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: store[key].resetTime,
    };
  }

  if (store[key].count >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: store[key].resetTime,
    };
  }

  store[key].count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - store[key].count,
    resetTime: store[key].resetTime,
  };
}

// Cleanup old entries periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    Object.keys(store).forEach((key) => {
      if (now > store[key].resetTime) {
        delete store[key];
      }
    });
  }, WINDOW_MS);
}
