import {
  Card,
  Container,
  Flex,
  Group,
  Paper,
  Pill,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import FullPageLoader from '../../components/FullPageLoader';
import { formatCurrency } from '../../utils/currency';
import AddTransaction from './components/AddTransaction';
import AddTransactionModal from './components/AddTransactionModal';
import Experiment from './components/Experiment';
import ExportCSV from './components/ExportCSV';
import useETFViewModel from './viewModel';

const Home = () => {
  const { transactions, isLoading, addETFTransactionModel } = useETFViewModel();

  if (isLoading) {
    return <FullPageLoader />;
  }

  const rows = transactions?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Pill>{element.etf_name}</Pill>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" align="center">
          <IconCalendar size={16} />
          {element.purchase_datetime
            ? dayjs(element.purchase_datetime).format('DD-MM-YYYY')
            : '-'}
        </Group>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        {element.units_bought}
      </Table.Td>
      <Table.Td>{formatCurrency(element.cost_per_unit || 0)}</Table.Td>
      <Table.Td>{formatCurrency(element.total_cost_without_fee || 0)}</Table.Td>
      <Table.Td>
        <Pill>{formatCurrency(element.transaction_fee || 0)}</Pill>
      </Table.Td>
      <Table.Td>{formatCurrency(element.total_cost_with_fee || 0)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Stack justify="center">
        <Flex justify="flex-end" align="center" gap="md">
          <ExportCSV />
          <Experiment />
          <AddTransaction onClick={addETFTransactionModel.onOpen} />
        </Flex>

        <Card shadow="none" padding="lg" radius="md" withBorder>
          <Card.Section inheritPadding py="lg">
            <Title order={3}>Transaction History</Title>
            <Text c="dimmed" size="sm">
              A detailed view of all your ETF purchases
            </Text>
          </Card.Section>

          <Table.ScrollContainer minWidth={500}>
            <Paper withBorder mt="md" radius="md" shadow="none">
              <Table highlightOnHover verticalSpacing="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>ETF</Table.Th>
                    <Table.Th>Purchase Date</Table.Th>
                    <Table.Th style={{ textAlign: 'center' }}>Units</Table.Th>

                    <Table.Th>Cost/Unit</Table.Th>
                    <Table.Th>Total (No Fees)</Table.Th>
                    <Table.Th>Transaction Fee</Table.Th>
                    <Table.Th>Total (With Fees)</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Paper>
          </Table.ScrollContainer>
        </Card>

        <AddTransactionModal {...addETFTransactionModel} />
      </Stack>
    </Container>
  );
};

export default Home;
