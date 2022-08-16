import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { Link, useLocation } from 'react-router-dom';
import { paths } from 'routes/paths';
import {
  TeamOutlined,
  ProfileOutlined,
  HomeOutlined,
  ScheduleOutlined,
  SnippetsOutlined,
  SolutionOutlined,
  FundViewOutlined,
  CarOutlined,
  ContainerOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { navigationKeys } from 'constants/navigationKeys';
import { permissions } from 'constants/permissions';
import { NavigationItem } from 'components/Organisms/Navigation/NavigationItem';
import { PermissionGate } from 'scenes/Root/PermissionGate';
import { mainPath } from 'constants/rexExps';
import { desktopBreakpoints } from 'theme/breakpoints';
import classNames from 'classnames';
import {
  ARTICLES,
  HOME,
  MANAGEMENT,
  POSITIONS_TITLE,
  USERS,
  ONBOARDING_TEMPLATES,
  LEVELS_TITLE,
  LEGACY,
  GENERATE_CV,
  LIST_OF_CV,
} from 'constants/titles';
import { useSelector } from 'react-redux';
import { appSelector } from 'store/app';

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

const { SubMenu } = Menu;

interface IProps {
  collapsed: boolean;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Navigation = ({ collapsed, setCollapse }: IProps) => {
  const { isHaveTemplates, isHavePermissionToOT } = useSelector(appSelector);

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
        <Menu mode="inline">
          <SubMenu title={LEGACY}>
            <NavigationItem
              icon={<HomeOutlined />}
              selectedItem={selectedItem}
              itemKey={navigationKeys['/']}
              setSelectedItem={setSelectedItem}
              setCollapse={setCollapse}
            >
              <Link to={paths.home}>{HOME}</Link>
            </NavigationItem>
            <NavigationItem
              icon={<ProfileOutlined />}
              selectedItem={selectedItem}
              itemKey={navigationKeys['/articles']}
              setSelectedItem={setSelectedItem}
              setCollapse={setCollapse}
              disabled
            >
              <Link to={paths.articles}>{ARTICLES}</Link>
            </NavigationItem>
            <PermissionGate permissions={[permissions.getAllUsers]}>
              <NavigationItem
                icon={<TeamOutlined />}
                selectedItem={selectedItem}
                itemKey={navigationKeys['/users']}
                setSelectedItem={setSelectedItem}
                setCollapse={setCollapse}
              >
                <Link to={paths.users}>{USERS}</Link>
              </NavigationItem>
            </PermissionGate>
            <PermissionGate permissions={[permissions.getAllUsers]}>
              <NavigationItem
                icon={<SnippetsOutlined />}
                selectedItem={selectedItem}
                itemKey={navigationKeys['/projects']}
                setSelectedItem={setSelectedItem}
                setCollapse={setCollapse}
              >
                <Link to={paths.projects}>Projects</Link>
              </NavigationItem>
            </PermissionGate>
            <PermissionGate
              permissions={[
                permissions.workWithOnBoardingTemplates,
                permissions.createPosition,
              ]}
              customPermission={() => isHavePermissionToOT || !!isHaveTemplates}
            >
              <Menu mode="inline">
                <SubMenu
                  icon={<FundViewOutlined />}
                  className={classNames(
                    selectedItem.includes(navigationKeys['/positions']) ||
                      selectedItem.includes(navigationKeys['/levels']) ||
                      selectedItem.includes(
                        navigationKeys['/onboarding-templates'],
                      )
                      ? 'ant-menu-item-selected'
                      : '',
                  )}
                  title={MANAGEMENT}
                >
                  <PermissionGate permissions={[permissions.createPosition]}>
                    <NavigationItem
                      icon={<SolutionOutlined />}
                      selectedItem={selectedItem}
                      itemKey={navigationKeys['/positions']}
                      setSelectedItem={setSelectedItem}
                      setCollapse={setCollapse}
                    >
                      <Link to={paths.positions}>{POSITIONS_TITLE}</Link>
                    </NavigationItem>
                    <NavigationItem
                      icon={<SolutionOutlined />}
                      selectedItem={selectedItem}
                      itemKey={navigationKeys['/levels']}
                      setSelectedItem={setSelectedItem}
                      setCollapse={setCollapse}
                    >
                      <Link to={paths.levels}>{LEVELS_TITLE}</Link>
                    </NavigationItem>
                  </PermissionGate>
                  <PermissionGate
                    permissions={[permissions.workWithOnBoardingTemplates]}
                    customPermission={() =>
                      isHavePermissionToOT || !!isHaveTemplates
                    }
                  >
                    <NavigationItem
                      icon={<ScheduleOutlined />}
                      selectedItem={selectedItem}
                      itemKey={navigationKeys['/onboarding-templates']}
                      setSelectedItem={setSelectedItem}
                      setCollapse={setCollapse}
                      disabled
                    >
                      <Link to={paths.onboardingTemplates}>
                        {ONBOARDING_TEMPLATES}
                      </Link>
                    </NavigationItem>
                  </PermissionGate>
                </SubMenu>
              </Menu>
            </PermissionGate>
            <PermissionGate permissions={[permissions.getAllUsers]}>
              <NavigationItem
                icon={<CarOutlined />}
                selectedItem={selectedItem}
                itemKey={navigationKeys['/vacations']}
                setSelectedItem={setSelectedItem}
                setCollapse={setCollapse}
              >
                <Link to={paths.vacations}>Vacations</Link>
              </NavigationItem>
            </PermissionGate>
            <PermissionGate permissions={[permissions.getAllUsers]}>
              <NavigationItem
                icon={<ContainerOutlined />}
                selectedItem={selectedItem}
                itemKey={navigationKeys['/candidates']}
                setSelectedItem={setSelectedItem}
                setCollapse={setCollapse}
              >
                <Link to={paths.candidates}>Candidates</Link>
              </NavigationItem>
            </PermissionGate>
            <PermissionGate permissions={[permissions.getAllUsers]}>
              <NavigationItem
                icon={<ContainerOutlined />}
                selectedItem={selectedItem}
                itemKey={navigationKeys['/employees']}
                setSelectedItem={setSelectedItem}
                setCollapse={setCollapse}
              >
                <Link to={paths.employees}>Employees</Link>
              </NavigationItem>
            </PermissionGate>
          </SubMenu>
        </Menu>
      </ul>
    </>
  );
};
