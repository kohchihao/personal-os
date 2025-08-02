import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { zodResolver } from 'mantine-form-zod-resolver';
import z from 'zod';
import { formatCurrency } from '../../../utils/currency';

// Zod schema for form validation
const transactionSchema = z.object({
  etfName: z.string().min(1, 'ETF name is required'),
  purchaseDate: z.date({ message: 'Purchase date is required' }),
  units: z.number().min(0.01, 'Units must be greater than 0'),
  costPerUnit: z.number().min(0.01, 'Cost per unit must be greater than 0'),
  transactionFee: z.number().min(0, 'Transaction fee must be 0 or greater'),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

const useAddETFTransactionModel = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<TransactionFormValues>({
    mode: 'controlled',
    initialValues: {
      etfName: '',
      purchaseDate: new Date(),
      units: 0,
      costPerUnit: 0,
      transactionFee: 0,
    },
    validate: zodResolver(transactionSchema),
  });

  const watchedValues = form.getValues();
  const totalCostWithoutFee = watchedValues.units * watchedValues.costPerUnit;
  const totalCostWithFee = totalCostWithoutFee + watchedValues.transactionFee;

  const handleSubmit = (values: TransactionFormValues) => {
    // TODO: Implement transaction submission logic
    console.log('Transaction data:', values);
    close();
    form.reset();
  };
  return {
    form,
    handleSubmit,
    shouldShowPreview: watchedValues.units > 0 && watchedValues.costPerUnit > 0,
    isSubmitDisabled: false,
    opened,
    onClose: close,
    onOpen: open,
    preview: {
      units: watchedValues.units,
      costPerUnit: formatCurrency(watchedValues.costPerUnit),
      subtotal: formatCurrency(watchedValues.units * watchedValues.costPerUnit),
      transactionFee: formatCurrency(watchedValues.transactionFee),
      total: formatCurrency(totalCostWithFee),
    },
  };
};

export default useAddETFTransactionModel;
