import { Avatar, Menu } from '@mantine/core';

const NavbarMenu = () => {
  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     notifications.show({
  //       color: 'red',
  //       title: 'Error logging out',
  //       message: error.message,
  //     });
  //   }
  // };
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar radius="xl" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        {/* <Menu.Item
          leftSection={<IconSettings size={14} />}
          href={ROUTES.SETTINGS_PAGE}
          component="a"
        >
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconLogout2 size={14} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
};

export default NavbarMenu;
