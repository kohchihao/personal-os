import useETFTransactions from '../../../queries/useETFTransactions';
import useAddETFTransactionModel from './useAddETFTransactionModel';

const useETFViewModel = () => {
  const { data: transactions, isLoading } = useETFTransactions();
  const addETFTransactionModel = useAddETFTransactionModel();

  return {
    transactions,
    isLoading,
    addETFTransactionModel,
  };
};

export default useETFViewModel;
