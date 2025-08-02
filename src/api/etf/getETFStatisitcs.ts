import { pb } from '../../utils/pocketbase';

export type Statistics = {
  id: string;
  etf_name?: string;
  total_units?: number;
  total_invested_capital?: number;
  average_cost_per_unit?: number;
  average_cost_per_unit_with_fee?: number;
  total_transaction_fee?: number;
};

export const getETFStatistics = async () => {
  const record = await pb
    .collection('user_statistics')
    .getFirstListItem(`user="${pb.authStore.record?.id}"`);
  return record;
};
