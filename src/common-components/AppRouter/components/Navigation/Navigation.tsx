import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { StarFilled } from '@ant-design/icons';
import { Tooltip } from 'antd';

import { navigationKeys, mainPath, CANDIDATES, EMPLOYEES, SETTINGS } from './utils/constants';

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
          itemKey={[navigationKeys['/candidates'] || navigationKeys['/candidate']]}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
          icon={<StarFilled />}
        >
          <Tooltip placement="right" title={collapsed ? CANDIDATES : ''}>
            <Link to={paths.candidateList}>{CANDIDATES}</Link>
          </Tooltip>
        </NavigationItem>
        <NavigationItem
          selectedItem={selectedItem}
          itemKey={[navigationKeys['/employees'] || navigationKeys['/employee']]}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
          icon={<StarFilled />}
        >
          <Tooltip placement="right" title={collapsed ? EMPLOYEES : ''}>
            <Link to={paths.employeesList}>{EMPLOYEES}</Link>
          </Tooltip>
        </NavigationItem>
        <NavigationItem
          selectedItem={selectedItem}
          itemKey={[navigationKeys['/settings']]}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
          icon={<StarFilled />}
        >
          <Tooltip placement="right" title={collapsed ? SETTINGS : ''}>
            <Link to={paths.settings}>{SETTINGS}</Link>
          </Tooltip>
        </NavigationItem>
      </ul>
    </>
  );
};
