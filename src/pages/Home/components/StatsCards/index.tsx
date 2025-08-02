import {
  Card,
  Group,
  ScrollArea,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { IconCoins, IconTrendingUp, IconWallet } from '@tabler/icons-react';
import type { Statistics } from '../../../../api/etf/getETFStatisitcs';
import { formatCurrency } from '../../../../utils/currency';

interface StatsCardsProps {
  statistics?: Statistics;
}

const StatsCards = ({ statistics }: StatsCardsProps) => {
  const totalUnits = statistics?.total_units || 0;
  const totalCapitalInvested = statistics?.total_invested_capital || 0;
  const averageCostPerUnitWithFee =
    statistics?.average_cost_per_unit_with_fee || 0;
  const totalTransactionFee = statistics?.total_transaction_fee || 0;
  const averageCostPerUnit = statistics?.average_cost_per_unit || 0;

  const statsData = [
    {
      title: 'Total Invested',
      value: formatCurrency(totalCapitalInvested + totalTransactionFee),
      icon: IconWallet,
      color: 'orange',
    },
    {
      title: 'Total Units',
      value: totalUnits.toFixed(2),
      icon: IconCoins,
      color: 'blue',
    },
    {
      title: 'Average Cost/Unit (With Fees)',
      value: formatCurrency(averageCostPerUnitWithFee),
      subtitle: `Avg. Cost/Unit w/o fees: ${formatCurrency(
        averageCostPerUnit
      )}`,
      icon: IconTrendingUp,
      color: 'green',
    },
    {
      title: 'Total Capital Invested',
      value: formatCurrency(totalCapitalInvested),
      subtitle: `${formatCurrency(totalTransactionFee)} in fees`,
      icon: IconWallet,
      color: 'green',
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
      <SimpleGrid cols={4} spacing="md" visibleFrom="sm">
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
