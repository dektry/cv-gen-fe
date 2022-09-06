/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useState } from 'react';
import { Avatar, Typography, Row, Col, Modal, Button, Menu, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ImportOutlined, LineChartOutlined } from '@ant-design/icons';

import { getAvatarUrl } from 'actions/user';
import { IDBUser } from 'models/IUser';

import { JobPositionTag } from '../JobPositionTag';

import { MY_CAREER, CAREER, CLOSE, LOGOUT as LOGOUT_STR } from './utils/constants';
import paths from 'config/routes.json';
import { useAppDispatch } from 'store';
import { logOut } from 'store/reducers/app';
import { useStyles } from './styles';

interface IProps {
  chosenUser: IDBUser | null | undefined;
}

const { Title } = Typography;

export const ProfilePreview = ({ chosenUser }: IProps) => {
  const classes = useStyles();
  const [isOpenModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate(paths.home);
  };

  return chosenUser ? (
    <>
      <Modal
        title={MY_CAREER}
        visible={isOpenModal}
        onCancel={closeModal}
        key={chosenUser.id}
        footer={
          <Button key={CLOSE} onClick={closeModal}>
            {CLOSE}
          </Button>
        }
      ></Modal>
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item
              key="0"
              icon={<LineChartOutlined />}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <span>{CAREER}</span>
            </Menu.Item>
            <Menu.Item key="1" icon={<ImportOutlined />} onClick={handleLogout}>
              <Link to={paths.users}>{LOGOUT_STR}</Link>
            </Menu.Item>
          </Menu>
        }
      >
        <Row className={classes.container}>
          <Col className={classes.avatarContainer}>
            <Avatar src={getAvatarUrl(chosenUser.avatarFileName)} />
          </Col>
          <Col>
            <Title level={4} className={classes.name}>{`${chosenUser.firstName} ${chosenUser.lastName}`}</Title>
            <div
              className={classes.tag}
              onClick={() => {
                setOpenModal(true);
              }}
            >
              <JobPositionTag position={chosenUser.position} />
            </div>
          </Col>
        </Row>
      </Dropdown>
    </>
  ) : null;
};
