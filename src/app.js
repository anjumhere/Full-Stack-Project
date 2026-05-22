import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

export { app };

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    Credentials: true,
  }),
);
app.use(express.json({ limit: '16kb' })); // to handle data comming from forms.
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // handle url data , url encoder
app.use(express.static('public'));
app.use(cookieParser());
