import {
  ActionIcon,
  Card,
  Container,
  Flex,
  Group,
  Menu,
  Paper,
  Pill,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import {
  IconCalendar,
  IconDots,
  IconDownload,
  IconEye,
  IconEyeClosed,
  IconTestPipe,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import FullPageLoader from '../../components/FullPageLoader';
import { usePrivacy } from '../../context/privacyContext';
import { formatCurrency } from '../../utils/currency';
import AddTransaction from './components/AddTransaction';
import AddTransactionModal from './components/AddTransactionModal';
import StatsCards from './components/StatsCards';
import useETFViewModel from './viewModel';

const Home = () => {
  const {
    transactions,
    statistics,
    isLoading,
    addETFTransactionModel,
    handleDeleteTransaction,
    isDeletingTransaction,
  } = useETFViewModel();

  const { isPrivacyMode, togglePrivacyMode } = usePrivacy();

  if (isLoading) {
    return <FullPageLoader />;
  }

  const rows = transactions?.map((element) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Pill>{isPrivacyMode ? '****' : element.etf_name}</Pill>
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
        {isPrivacyMode ? '****' : element.units_bought}
      </Table.Td>
      <Table.Td>
        {formatCurrency(element.cost_per_unit || 0, isPrivacyMode)}
      </Table.Td>
      <Table.Td>
        {formatCurrency(element.total_cost_without_fee || 0, isPrivacyMode)}
      </Table.Td>
      <Table.Td>
        <Pill>
          {formatCurrency(element.transaction_fee || 0, isPrivacyMode)}
        </Pill>
      </Table.Td>
      <Table.Td>
        {formatCurrency(element.total_cost_with_fee || 0, isPrivacyMode)}
      </Table.Td>
      <Table.Td>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              loading={isDeletingTransaction}
            >
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={14} />}
              onClick={() => handleDeleteTransaction(element.id)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="xl" px={{ base: 0 }}>
      <Stack justify="center">
        <Flex justify="flex-end" align="center" gap="md">
          <ActionIcon variant="default" onClick={togglePrivacyMode}>
            {isPrivacyMode ? <IconEyeClosed /> : <IconEye />}
          </ActionIcon>

          <AddTransaction onClick={addETFTransactionModel.onOpen} />

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="default">
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item leftSection={<IconDownload size={14} />}>
                Export CSV
              </Menu.Item>
              <Menu.Item leftSection={<IconTestPipe size={14} />}>
                Experiment
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>

        <StatsCards statistics={statistics} />

        <Card shadow="none" padding="lg" radius="md" withBorder>
          <Card.Section inheritPadding py="lg">
            <Title order={3}>Transaction History</Title>
            <Text c="dimmed" size="sm">
              A detailed view of all your ETF purchases
            </Text>
          </Card.Section>

          <Table.ScrollContainer minWidth={700}>
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
                    <Table.Th>Actions</Table.Th>
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
