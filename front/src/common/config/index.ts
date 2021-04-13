export const configs = {
  API_URL: process.env.API_URL || 'http://localhost:3000',
  ENV: process.env.NODE_ENV || 'development',
  VERSION: process.env.VERSION || '1',
};

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
