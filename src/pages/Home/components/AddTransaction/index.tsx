import { Button } from '@mantine/core';

type Props = {
  onClick?: () => void;
};

const AddTransaction = ({ onClick }: Props) => {
  return (
    <Button color="black" onClick={onClick}>
      Add Transaction
    </Button>
  );
};

export default AddTransaction;
