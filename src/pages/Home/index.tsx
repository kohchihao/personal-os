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
import { formatCurrency } from '../../utils/currency';
import AddTransaction from './components/AddTransaction';
import Experiment from './components/Experiment';
import ExportCSV from './components/ExportCSV';

type Transaction = {
  purchase_date?: Date;
  id: string;
  etf_name?: string;
  units_bought?: number;
  cost_per_unit?: number;
  total_cost_without_fees?: number;
  total_cost_with_fees?: number;
  transaction_fee?: number;
};

const mockTransactions: Transaction[] = [
  {
    purchase_date: new Date('2025-07-15'),
    id: 'txn001',
    etf_name: 'Tech Growth ETF',
    units_bought: 50,
    cost_per_unit: 200,
    total_cost_without_fees: 10000,
    total_cost_with_fees: 10100,
    transaction_fee: 100,
  },
  {
    purchase_date: new Date('2025-06-20'),
    id: 'txn002',
    etf_name: 'Global Equity ETF',
    units_bought: 100,
    cost_per_unit: 150,
    total_cost_without_fees: 15000,
    total_cost_with_fees: 15150,
    transaction_fee: 150,
  },
  {
    purchase_date: new Date('2025-05-10'),
    id: 'txn003',
    etf_name: 'Sustainable Energy ETF',
    units_bought: 75,
    cost_per_unit: 120,
    total_cost_without_fees: 9000,
    total_cost_with_fees: 9100,
    transaction_fee: 100,
  },
  {
    purchase_date: new Date('2025-04-01'),
    id: 'txn004',
    etf_name: 'Healthcare Innovation ETF',
    units_bought: 40,
    cost_per_unit: 250,
    total_cost_without_fees: 10000,
    total_cost_with_fees: 10150,
    transaction_fee: 150,
  },
  {
    purchase_date: new Date('2025-03-15'),
    id: 'txn005',
    etf_name: 'AI & Robotics ETF',
    units_bought: 60,
    cost_per_unit: 180,
    total_cost_without_fees: 10800,
    total_cost_with_fees: 10900,
    transaction_fee: 100,
  },
];

const Home = () => {
  const rows = mockTransactions.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Pill>{element.etf_name}</Pill>
      </Table.Td>
      <Table.Td>
        <Group gap="xs" align="center">
          <IconCalendar size={16} />
          {element.purchase_date?.toLocaleDateString()}
        </Group>
      </Table.Td>
      <Table.Td style={{ textAlign: 'center' }}>
        {element.units_bought}
      </Table.Td>
      <Table.Td>{formatCurrency(element.cost_per_unit || 0)}</Table.Td>
      <Table.Td>
        {formatCurrency(element.total_cost_without_fees || 0)}
      </Table.Td>
      <Table.Td>
        <Pill>{formatCurrency(element.transaction_fee || 0)}</Pill>
      </Table.Td>
      <Table.Td>{formatCurrency(element.total_cost_with_fees || 0)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl">
      <Stack justify="center">
        <Flex justify="flex-end" align="center" gap="md">
          <ExportCSV />
          <Experiment />
          <AddTransaction />
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
      </Stack>
    </Container>
  );
};

export default Home;
