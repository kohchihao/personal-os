import { Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

type Props = {
  onClick?: () => void;
};

const AddTransaction = ({ onClick }: Props) => {
  return (
    <Button
      color="black"
      onClick={onClick}
      leftSection={<IconPlus size={16} />}
    >
      Add
    </Button>
  );
};

export default AddTransaction;
