import { pb } from '../../utils/pocketbase';

export type Transaction = {
  purchase_datetime?: Date;
  id: string;
  etf_name?: string;
  units_bought?: number;
  cost_per_unit?: number;
  total_cost_without_fee?: number;
  total_cost_with_fee?: number;
  transaction_fee?: number;
};

export const getETFTransactions = async () => {
  const records = await pb
    .collection('etf_transactions')
    .getFullList<Transaction>();
  return records;
};
