import { useNavigate } from 'react-router-dom';

import { MdDashboard, MdTopic } from "react-icons/md";
import { FaMusic } from "react-icons/fa";

import type { MenuProps } from 'antd';
import { Menu } from 'antd';

import configs from '../../configs';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: `/${configs.PATH_ADMIN}`,
    label: "Tổng Quan",
    icon: <MdDashboard />
  },
  {
    key: `/${configs.PATH_ADMIN}/topics`,
    label: "Chủ Đề",
    icon: <MdTopic />
  },
  {
    key: `/${configs.PATH_ADMIN}/songs`,
    label: "Bài Hát",
    icon: <FaMusic />
  }
];

function PartialMenu() {
  const pathName = window.location.pathname;

  const navigate = useNavigate();

  const handleNavigate: MenuProps['onClick'] = (e) => {
    const key = e.key;
    navigate(key);
  };

  return (
    <Menu
      onClick={handleNavigate}
      style={{ width: 256 }}
      defaultSelectedKeys={[pathName]}
      defaultOpenKeys={[pathName]}
      mode="inline"
      items={items}
    />
  );
}

export default PartialMenu;