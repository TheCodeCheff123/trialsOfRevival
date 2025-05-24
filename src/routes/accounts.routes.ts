import express from 'express';
import {
  createAccount,
  decryptData,
  listAccounts
} from '../controllers/account.controller';

const router = express.Router();

router.post('/accounts', createAccount);
router.get('/accounts', listAccounts);
router.post('/decrypt', decryptData);

export default router;
