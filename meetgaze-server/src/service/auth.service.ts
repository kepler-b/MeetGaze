import { readFileSync } from 'fs';
import * as admin from 'firebase-admin';
import logger from '../logger';

export class AuthService {
  private initializationStatus = false;

  private static instance: AuthService | null = null;

  constructor() {
    this.init();
  }

  static getInstance() {
    if (!this.instance) {
      const newInstance = new AuthService();
      this.instance = newInstance
    }
    return this.instance;
  }

  private init() {
    if (this.initializationStatus) {
      logger.warn('Firebase Admin SDK already initialized.');
      return;
    }

    try {
      const serviceKeyPath = process.env['SERVICE_KEY_PATH'];
      if (!serviceKeyPath) {
        logger.warn("Service Key not found");
        return;
      }

      const serviceKey = JSON.parse(readFileSync(serviceKeyPath, 'utf8'));

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceKey),
        });
        logger.info('Firebase Admin SDK initialized successfully.');
      } else {
        logger.warn('Firebase Admin SDK was already initialized.');
      }

      this.initializationStatus = true;
    } catch (err) {
      logger.error(
        'Failed to initialize Firebase Admin SDK',
        (err as any).stack || err,
      );
      throw new Error('Firebase initialization failed');
    }
  }


  async verifyToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      logger.info(`Token verified for user: ${decodedToken.uid}`);
      return decodedToken;
    } catch (error) {
      logger.error("Failed to verify token", (error as any).stack || error);
      throw new Error("Token verification failed");
    }
  }
}
