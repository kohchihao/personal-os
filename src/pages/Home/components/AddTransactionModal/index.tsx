import {
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCalendar, IconCurrencyDollar } from '@tabler/icons-react';
import type useAddETFTransactionModel from '../../viewModel/useAddETFTransactionModel';

type Props = ReturnType<typeof useAddETFTransactionModel>;

const AddTransactionModal = ({
  form,
  opened,
  onClose,
  shouldShowPreview,
  preview,
  isSubmitDisabled,
}: Props) => {
  const theme = useMantineTheme();
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Title order={3}>Add New Transaction</Title>}
      size="md"
      centered
    >
      <Stack gap="md">
        <TextInput
          label="ETF Name"
          placeholder="Enter ETF name (e.g., VWRA, SPY)"
          key={form.key('etfName')}
          {...form.getInputProps('etfName')}
          required
        />

        <DateInput
          label="Purchase Date"
          placeholder="Select purchase date"
          key={form.key('purchaseDate')}
          {...form.getInputProps('purchaseDate')}
          leftSection={<IconCalendar size={16} />}
          required
        />

        <NumberInput
          label="Number of Units"
          placeholder="Enter number of units"
          key={form.key('units')}
          {...form.getInputProps('units')}
          min={0}
          decimalScale={5}
          required
          hideControls
        />

        <NumberInput
          label="Cost per Unit"
          placeholder="Enter cost per unit"
          key={form.key('costPerUnit')}
          {...form.getInputProps('costPerUnit')}
          leftSection={<IconCurrencyDollar size={16} />}
          min={0}
          decimalScale={5}
          required
          hideControls
        />

        <NumberInput
          label="Transaction Fee"
          placeholder="Enter transaction fee"
          key={form.key('transactionFee')}
          {...form.getInputProps('transactionFee')}
          leftSection={<IconCurrencyDollar size={16} />}
          min={0}
          decimalScale={5}
          required
          hideControls
        />

        {shouldShowPreview && (
          <>
            <Card withBorder padding="md" radius="md" bg={theme.colors.gray[0]}>
              <Title order={4} mb="md">
                Transaction Preview
              </Title>
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Units x Price:
                  </Text>
                  <Text size="sm" fw={500}>
                    {preview.units} x {preview.costPerUnit}
                  </Text>
                </Group>

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Subtotal:
                  </Text>
                  <Text size="sm" fw={500}>
                    {preview.subtotal}
                  </Text>
                </Group>

                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Transaction Fee:
                  </Text>
                  <Text size="sm" fw={500}>
                    {preview.transactionFee}
                  </Text>
                </Group>

                <Divider size="xs" />

                <Group justify="space-between">
                  <Text size="md" fw={700}>
                    Total Cost:
                  </Text>
                  <Text size="md" fw={700} c="blue">
                    {preview.total}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </>
        )}

        <Flex gap="md" justify="flex-end" mt="md">
          <Button variant="default" onClick={close}>
            Cancel
          </Button>
          <Button
            color="black"
            // onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Add Transaction
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default AddTransactionModal;
