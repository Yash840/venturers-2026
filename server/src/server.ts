import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import participantRoutes from './routes/participant';
import adminAuthRoutes from './routes/adminAuth';
import adminPanelRoutes from './routes/adminPanel';

dotenv.config({debug: true});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/participants', participantRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/panel', adminPanelRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
