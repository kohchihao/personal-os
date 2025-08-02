import useETFStatistics from '../../../queries/useETFStatistics';
import useETFTransactions from '../../../queries/useETFTransactions';
import useDeleteETFTransaction from '../queries/useDeleteETFTransaction';
import useAddETFTransactionModel from './useAddETFTransactionModel';

const useETFViewModel = () => {
  const { data: transactions, isLoading } = useETFTransactions();
  const addETFTransactionModel = useAddETFTransactionModel();
  const deleteETFTransaction = useDeleteETFTransaction();

  const handleDeleteTransaction = (id: string) => {
    deleteETFTransaction.mutate(id);
  };
  const { data: statistics } = useETFStatistics();

  return {
    transactions,
    statistics,
    isLoading,
    addETFTransactionModel,
    handleDeleteTransaction,
    isDeletingTransaction: deleteETFTransaction.isPending,
  };
};

export default useETFViewModel;
