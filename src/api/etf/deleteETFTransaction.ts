import { pb } from '../../utils/pocketbase';

export const deleteETFTransaction = async (id: string) => {
  return await pb.collection('etf_transactions').delete(id);
};
