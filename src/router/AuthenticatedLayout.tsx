import { AppShell, Burger, Group, NavLink, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCashBanknote,
  IconChevronRight,
  IconCoinMoneroFilled,
  IconHome,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants';
import useUser from '../hooks/useUser';

const data = [
  { link: '/', label: 'Home', icon: IconHome },
  { link: '/etf', label: 'ETF', icon: IconCashBanknote },
];

const AuthenticatedLayout = () => {
  const user = useUser();
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState('Home');

  if (!user) {
    // or you can redirect to a different page and show a message
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <IconCoinMoneroFilled size={30} />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section p="md">Command Centre</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea} px="md">
          {data.map((item, index) => (
            <>
              <NavLink
                leftSection={<item.icon size={16} stroke={1.5} />}
                label={item.label}
                data-active={item.label === active || undefined}
                onClick={() => {
                  setActive(item.label);
                }}
                href={item.link}
                key={index}
                color="cyan"
                rightSection={<IconChevronRight size={16} stroke={1.5} />}
              />
            </>
          ))}
        </AppShell.Section>

        <AppShell.Section p="md">
          Navbar footer – always at the bottom
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AuthenticatedLayout;
