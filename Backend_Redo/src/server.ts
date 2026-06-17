import app from './app';
import connectDb from '../config/db';
import dns from 'node:dns/promises';

// Only run the DNS override on your local computer during development
if (process.env.NODE_ENV !== 'production') {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    console.log(`Test URL: http://localhost:${PORT}/api/health`);
  });
}).catch(err => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});
