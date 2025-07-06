import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

dotenv.config();

const defaultClient = brevo.ApiClient.instance;
defaultClient.authentications['api-key'].apiKey = process.env.BREVO_API;

export const emailApi = new brevo.TransactionalEmailsApi();

export const sender = {
    name: "Career Cursor",
    email: "hello@careercursor.site",
  };

