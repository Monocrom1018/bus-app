export const configs = {
  API_URL: process.env.API_URL || 'http://localhost:3000',
  SERVICE_URL: process.env.SERVICE_URL || 'http://0.0.0.0:8080',
  ENV: process.env.NODE_ENV || 'development',
  VERSION: process.env.VERSION || '1',
  AWS_API_KEY: process.env.AWS_API_KEY || '',
};

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
