import { Button } from '@mantine/core';
import { IconTestPipe } from '@tabler/icons-react';

type Props = {
  onClick?: () => void;
};
const Experiment = ({ onClick }: Props) => {
  return (
    <Button
      color="black"
      variant="default"
      onClick={onClick}
      leftSection={<IconTestPipe size={16} />}
    >
      Experiment
    </Button>
  );
};

export default Experiment;
