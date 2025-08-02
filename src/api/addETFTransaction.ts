import { pb } from '../utils/pocketbase';
import type { Transaction } from './getETFTransactions';

export type AddTransactionParams = Omit<Transaction, 'id' | 'user'>;

const addETFTransaction = async (transaction: AddTransactionParams) => {
  const data = {
    ...transaction,
    user: pb.authStore.record?.id,
  };

  return await pb.collection('etf_transactions').create(data);
};

export default addETFTransaction;
