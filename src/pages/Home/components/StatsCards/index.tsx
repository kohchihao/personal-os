import {
  Card,
  Group,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { IconCoins, IconTrendingUp, IconWallet } from '@tabler/icons-react';
import type { Transaction } from '../../../../api/getETFTransactions';
import { formatCurrency } from '../../../../utils/currency';

interface StatsCardsProps {
  transactions: Transaction[];
}

const StatsCards = ({ transactions }: StatsCardsProps) => {
  // Calculate total units
  const totalUnits = transactions.reduce((sum, transaction) => {
    return sum + (transaction.units_bought || 0);
  }, 0);

  // Calculate average cost with fees
  const totalCostWithFees = transactions.reduce((sum, transaction) => {
    return sum + (transaction.total_cost_with_fee || 0);
  }, 0);
  const averageCostWithFees =
    totalUnits > 0 ? totalCostWithFees / totalUnits : 0;

  // Calculate total invested and total fees
  const totalInvested = totalCostWithFees;
  const totalFees = transactions.reduce((sum, transaction) => {
    return sum + (transaction.transaction_fee || 0);
  }, 0);

  const statsData = [
    {
      title: 'Total Units',
      value: totalUnits.toFixed(2),
      icon: IconCoins,
      color: 'blue',
    },
    {
      title: 'Average Cost (With Fees)',
      value: formatCurrency(averageCostWithFees),
      icon: IconTrendingUp,
      color: 'green',
    },
    {
      title: 'Total Invested',
      value: formatCurrency(totalInvested),
      subtitle: `Total Fees: ${formatCurrency(totalFees)}`,
      icon: IconWallet,
      color: 'orange',
    },
  ];

  return (
    <>
      {/* Mobile: Horizontal scrollable */}
      <ScrollArea type="never" style={{ display: 'block' }} hiddenFrom="sm">
        <Group gap="md" wrap="nowrap" style={{ width: 'max-content' }}>
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                padding="lg"
                radius="md"
                withBorder
                style={{ minWidth: '280px', flexShrink: 0, minHeight: '140px' }}
              >
                <Group justify="space-between" mb="xs">
                  <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                    {stat.title}
                  </Text>
                  <Icon
                    size={20}
                    color={`var(--mantine-color-${stat.color}-6)`}
                  />
                </Group>

                <Title order={2} fw={700} mb={stat.subtitle ? 'xs' : 0}>
                  {stat.value}
                </Title>

                {stat.subtitle && (
                  <Text size="sm" c="dimmed">
                    {stat.subtitle}
                  </Text>
                )}
              </Card>
            );
          })}
        </Group>
      </ScrollArea>

      {/* Desktop: Grid layout */}
      <SimpleGrid cols={3} spacing="md" visibleFrom="sm">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} padding="lg" radius="md" withBorder>
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="dimmed" tt="uppercase" fw={700}>
                  {stat.title}
                </Text>
                <Icon
                  size={20}
                  color={`var(--mantine-color-${stat.color}-6)`}
                />
              </Group>

              <Title order={2} fw={700} mb={stat.subtitle ? 'xs' : 0}>
                {stat.value}
              </Title>

              {stat.subtitle && (
                <Text size="sm" c="dimmed">
                  {stat.subtitle}
                </Text>
              )}
            </Card>
          );
        })}
      </SimpleGrid>
    </>
  );
};

export default StatsCards;
