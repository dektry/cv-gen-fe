import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { 
  navigationKeys, 
  mainPath,
  GENERATE_CV,
  LIST_OF_CV,
 } from 'pages/Navigation/utils/constants';

import { NavigationItem } from 'pages/Navigation/NavigationItem';
import classNames from 'classnames';

import paths from 'config/routes.json';

import { useStyles } from 'pages/Navigation/styles';


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
