import React from 'react';
import { navigationKeys } from './utils/constants';
import { useIsMobile } from 'theme/Responsive';
import classNames from 'classnames';

interface IProps {
  children?: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode | React.ReactNode[];
  selectedItem: string;
  itemKey: Array<navigationKeys>;
  setSelectedItem: React.Dispatch<React.SetStateAction<navigationKeys>>;
  onClickAction?: () => void;
  className?: string;
  setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
}

export const NavigationItem = ({
  children,
  icon,
  selectedItem,
  itemKey,
  setSelectedItem,
  onClickAction,
  className,
  setCollapse,
  disabled,
}: IProps) => {
  const isSelected = selectedItem.includes(itemKey[0]) || selectedItem.includes(itemKey[1]);
  const itemClasses: string = classNames(
    isSelected ? 'ant-menu-item ant-menu-item-selected' : 'ant-menu-item',
    disabled ? 'ant-menu-item-hidden' : '',
    className
  );
  const isMobile = useIsMobile();
  return (
    <>
      <li
        className={itemClasses}
        onClick={() => {
          if (!disabled) {
            setSelectedItem(itemKey[0]);
            if (onClickAction) {
              onClickAction();
            }
            if (isMobile) {
              setCollapse(true);
            }
          }
        }}
      >
        {icon}
        <span>{children}</span>
      </li>
    </>
  );
};
