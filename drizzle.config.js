import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url:'postgresql://neondb_owner:npg_NqG2bzvKRh3m@ep-lively-shadow-adkvx0mv-pooler.c-2.us-east-1.aws.neon.tech/ai-room-designer?sslmode=require&channel_binding=require',
  },
});
