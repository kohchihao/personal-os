import { Button } from '@mantine/core';

type Props = {
  onClick?: () => void;
};
const Experiment = ({ onClick }: Props) => {
  return (
    <Button color="black" variant="default" onClick={onClick}>
      Experiment
    </Button>
  );
};

export default Experiment;
