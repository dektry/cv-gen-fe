import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FileAddOutlined } from '@ant-design/icons';
import { OrderedListOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { navigationKeys, mainPath, GENERATE_CV, LIST_OF_CV } from './utils/constants';

import { NavigationItem } from './NavigationItem';
import classNames from 'classnames';

import paths from 'config/routes.json';

import { useStyles } from './styles';

interface IProps {
  collapsed: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Navigation = ({ collapsed, setCollapse }: IProps) => {
  const classes = useStyles();
  const pathname = mainPath.exec(useLocation().pathname)?.[0];
  const keyPathName = pathname as keyof typeof navigationKeys;
  const menuActiveItem = navigationKeys[keyPathName];
  const [selectedItem, setSelectedItem] = useState(menuActiveItem);

  useEffect(() => {
    setSelectedItem(menuActiveItem);
  }, [menuActiveItem]);

  const defaultMenuClasses = `${classes.menu} ant-menu ant-menu-light ant-menu-root`;
  const menuCollapsedClasses = 'ant-menu-inline-collapsed ant-menu-vertical';
  const menuNotCollapsedClasses = 'ant-menu-inline';
  return (
    <>
      <ul className={classNames(defaultMenuClasses, collapsed ? menuCollapsedClasses : menuNotCollapsedClasses)}>
        <NavigationItem
          selectedItem={selectedItem}
          itemKey={[navigationKeys['/'], navigationKeys['/generate-cv']]}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
          icon={<FileAddOutlined />}
        >
          <Tooltip placement="right" title={collapsed ? GENERATE_CV : ''}>
            <Link to={paths.home}>{GENERATE_CV}</Link>
          </Tooltip>
        </NavigationItem>
        <NavigationItem
          selectedItem={selectedItem}
          itemKey={[navigationKeys['/cv-list']]}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
          icon={<OrderedListOutlined />}
        >
          <Tooltip placement="right" title={collapsed ? LIST_OF_CV : ''}>
            <Link to={paths.listOfCVs}>{LIST_OF_CV}</Link>
          </Tooltip>
        </NavigationItem>
      </ul>
    </>
  );
};
