#!/usr/bin/env tsx
/**
 * Diagnostic script to check DATABASE_URL configuration
 * Run with: npx tsx scripts/check-db-url.ts
 */

const databaseUrl = process.env.DATABASE_URL;

console.log('=== DATABASE_URL Diagnostic ===\n');

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is not set in environment variables');
  console.log('\nPlease add DATABASE_URL to your .env file');
  process.exit(1);
}

console.log('DATABASE_URL is set');

// Parse the connection string
try {
  const url = new URL(databaseUrl);
  
  console.log('\n--- Connection String Analysis ---');
  console.log(`Protocol: ${url.protocol}`);
  console.log(`Username: ${url.username}`);
  console.log(`Password: ${url.password ? '***SET***' : '***MISSING***'}`);
  console.log(`Host: ${url.hostname}`);
  console.log(`Port: ${url.port || '5432 (default)'}`);
  console.log(`Database: ${url.pathname.slice(1) || '***MISSING***'}`);
  
  // Check for common issues
  console.log('\n--- Common Issues Check ---');
  
  if (!url.password) {
    console.error('❌ Password is missing from connection string');
  }
  
  if (!url.pathname || url.pathname === '/') {
    console.error('❌ Database name is missing from connection string');
  }
  
  if (url.hostname.includes('pooler')) {
    console.log('✅ Using pooled connection (recommended for production)');
  } else if (url.hostname.includes('db.')) {
    console.log('⚠️  Using direct connection (may cause P1000 error)');
    console.log('   Consider using pooled connection: postgresql://[user]:[password]@aws-0-[region].pooler.supabase.com:5432/[database]');
  }
  
  // Check for URL encoding issues
  const password = url.password;
  if (password && (password.includes('@') || password.includes(':') || password.includes('/') || password.includes('?'))) {
    console.log('⚠️  Password contains special characters that should be URL-encoded');
    console.log('   Make sure special characters in password are percent-encoded');
  }
  
  console.log('\n--- Expected Supabase Format ---');
  console.log('Pooled (recommended):');
  console.log('postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres');
  console.log('\nDirect (for migrations only):');
  console.log('postgresql://postgres.[project-ref]:[password]@aws-0-[region].supabase.com:5432/postgres');
  
} catch (error) {
  console.error('❌ Failed to parse DATABASE_URL:', error);
  console.log('\nDATABASE_URL format should be:');
  console.log('postgresql://[user]:[password]@[host]:[port]/[database]');
}

console.log('\n=== End Diagnostic ===');
