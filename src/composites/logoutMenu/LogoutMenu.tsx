import React from "react";
import { Avatar } from "@mantine/core";
import { Menu, Button, Text } from '@mantine/core';
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from '@tabler/icons-react';
import { useNavigate } from "react-router-dom";
type Props = {};

const LogoutMenu = (props: Props) => {
    const navigate  =useNavigate();
  return (
    <div className="mx-4">


      <Menu shadow="md" width={200}>
      <Menu.Target>
      <Avatar src={null} alt="User Profile " color="red" className="mx-8">
        AT
      </Avatar>

      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings size={14} />}>
          Settings
        </Menu.Item>
        <Menu.Item
          leftSection={<IconSearch size={14} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>
        <Menu.Item leftSection={<IconPhoto size={14} />} onClick={()=>{
          localStorage.removeItem("token");
            navigate("/login");
        }}>
          Logout 
        </Menu.Item>

      </Menu.Dropdown>
    </Menu>
    </div>
  );
};

export default LogoutMenu;
