import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useLocation } from 'react-router-dom';

import { 
  navigationKeys, 
  mainPath,
  GENERATE_CV,
  LIST_OF_CV,
 } from './utils/constants';
import { desktopBreakpoints } from 'theme/constants';

import { NavigationItem } from './NavigationItem';
import classNames from 'classnames';

import paths from 'config/routes.json';

const useStyles = createUseStyles({
  menu: {
    [`@media (max-width: ${desktopBreakpoints[0] - 1}px)`]: {
      margin: '-24px',
      width: 'calc(100% + 48px)',
      height: 'calc(100% + 48px)',
    },
    display: 'flex',
    flexDirection: 'column',
    '& li.ant-menu-item': {
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '24px',
      '& a:hover': {
        textDecoration: 'none',
      },
    },
    '& li.ant-menu-item-hidden': {
      display: 'none',
    },
    '&.ant-menu-inline-collapsed li.ant-menu-item': {
      [`@media (min-width: ${desktopBreakpoints[0]}px)`]: {
        padding: '0 calc(50% - 16px / 2)',
      },
    },
    '& .ant-menu-inline-collapsed .ant-menu-submenu-title': {
      paddingLeft: 'calc(50% - 16px / 2) !important',
    },
  },
});


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
      <ul
        className={classNames(
          defaultMenuClasses,
          collapsed ? menuCollapsedClasses : menuNotCollapsedClasses,
        )}
      >
        <NavigationItem
          selectedItem={selectedItem}
          itemKey={navigationKeys['/generate-cv']}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
        >
          <Link to={paths.generateCV}>{GENERATE_CV}</Link>
        </NavigationItem>
        <NavigationItem
          selectedItem={selectedItem}
          itemKey={navigationKeys['/cv-list']}
          setSelectedItem={setSelectedItem}
          setCollapse={setCollapse}
        >
          <Link to={paths.listOfCVs}>{LIST_OF_CV}</Link>
        </NavigationItem>
      </ul>
    </>
  );
};
