import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import addETFTransaction, {
  type AddTransactionParams,
} from '../../../api/etf/addETFTransaction';
import queryClient from '../../../utils/reactQuery';

type UseAddETFTransactionParams = {
  closeModal: () => void;
  resetForm: () => void;
};

const useAddETFTransaction = ({
  closeModal,
  resetForm,
}: UseAddETFTransactionParams) => {
  return useMutation({
    mutationFn: (params: AddTransactionParams) => addETFTransaction(params),
    onSuccess: () => {
      // Invalidate the ETF transactions query to refresh the data
      queryClient.invalidateQueries({ queryKey: ['etfTransactions'] });
      closeModal();
      resetForm();
    },
    onError: (error) => {
      closeModal();
      resetForm();
      notifications.show({
        color: 'red',
        title: 'Error adding ETF transaction',
        message: error.message,
      });
    },
  });
};

export default useAddETFTransaction;
