require('dotenv').config();

import StartServer from './server/httpServer';
import ConnectToDatabase from './server/database';
StartServer();
ConnectToDatabase();
