import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import 'dotenv/config';
import { sendResetPasswordMail } from './resend-mail';
// Check if MongoDB URL is defined, otherwise use a default local MongoDB URL
if (!process.env.MONGODB_URL) {
  console.warn(
    'MONGODB_URL environment variable is not defined. Using default local MongoDB URL.',
  );
}

const mongodbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/saas';
const client = new MongoClient(mongodbUrl);
const db = client.db();

// Check if APP_URL is defined, otherwise use a default URL
if (!process.env.APP_URL) {
  console.warn(
    'APP_URL environment variable is not defined. Using default URL.',
  );
}

const appUrl = process.env.APP_URL;

export const auth = betterAuth({
  database: mongodbAdapter(db),
  trustedOrigins: [appUrl as string],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendResetPasswordMail({ user, url });
    },
  },
  session:{
    storeSessionInDatabase:true,
  }
});
