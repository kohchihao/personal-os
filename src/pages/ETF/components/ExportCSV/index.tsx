import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';

type Props = {
  onClick?: () => void;
};
const ExportCSV = ({ onClick }: Props) => {
  return (
    <Button
      color="black"
      variant="default"
      leftSection={<IconDownload size={14} />}
      onClick={onClick}
    >
      Export CSV
    </Button>
  );
};

export default ExportCSV;
