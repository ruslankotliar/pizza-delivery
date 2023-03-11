import React, { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Col,
  Row,
  Space,
  Image,
  Button,
  Tooltip,
  theme,
  Divider,
} from 'antd';
import { GiFullPizza } from 'react-icons/gi';
import { ABOUT_ME, NAV_KEYS, ROUTER_KEYS } from '../consts';
import { useLocation } from 'react-router-dom';
import { throttle } from '../utils';
import { StringParam, useQueryParam } from 'use-query-params';
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { ModalLoginComponent } from '../components';

import { useSelector } from 'react-redux';
import { RootState } from '../app/rootReducer';

const { Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent: React.FC<Props> = ({ children }) => {
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [filter] = useQueryParam('filter', StringParam);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

  useEffect(() => {
    if (pathname === '/') {
      const handleScroll = (event: Event) => {
        setScrolled(!!window.scrollY);
      };

      window.addEventListener('scroll', throttle(handleScroll, 300));

      return () => {
        window.removeEventListener('scroll', throttle(handleScroll, 300));
      };
    } else {
      setScrolled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <ModalLoginComponent
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <header
        className={`header ${scrolled ? 'nav-scrolled' : 'nav-not-scrolled'}`}
      >
        <div
          className='logo'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            window.location.href = '/';
          }}
        >
          <GiFullPizza color={token.colorPrimary} fontSize='3em' />
          <Typography.Title
            style={{
              color: 'inherit',
              padding: 0,
              margin: 0,
              marginLeft: token.marginMD,
            }}
          >
            Pizza Delivery
          </Typography.Title>
        </div>
        <div className='nav-button-container'>
          {NAV_KEYS.map((item) => (
            <button
              className={
                filter === item.key && !scrolled
                  ? 'nav-button-active'
                  : filter === item.key && scrolled
                  ? 'nav-button-active-scrolled'
                  : scrolled
                  ? 'nav-button-scrolled'
                  : 'nav-button'
              }
              onClick={() => {
                window.location.href = ROUTER_KEYS.MENU + item.key;
              }}
            >
              {item.label}
            </button>
          ))}
          <Button
            type='primary'
            onClick={() => setIsModalOpen(true)}
            style={{
              color: token.colorPrimaryActive,
              fontWeight: 600,
            }}
          >
            ORDER NOW
          </Button>
        </div>
      </header>
      <Content className='site-layout'>{children}</Content>
      <FooterComponent />
    </Layout>
  );
};

const FooterComponent: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <Footer
      style={{
        textAlign: 'center',
        backgroundColor: token.colorPrimaryBgHover,
      }}
    >
      <Row
        style={{ justifyContent: 'center' }}
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      >
        <Col span={12}>
          <Space size={'large'} align={'start'} direction={'vertical'}>
            <Space align='end'>
              <Typography.Title style={{ margin: 0, padding: 0 }} level={2}>
                Pizza Delivery
              </Typography.Title>
              <Tooltip title='GitHub'>
                <Button
                  style={{
                    padding: 0,
                    margin: 0,
                  }}
                  shape='circle'
                  icon={
                    <GithubOutlined
                      style={{
                        fontSize: '2em',
                        backgroundColor: token.colorPrimaryBgHover,
                      }}
                    />
                  }
                  href={'https://github.com/ruslankotliar/pizza-delivery'}
                />
              </Tooltip>
            </Space>
            <Space size={'large'} align={'start'} direction={'vertical'}>
              <Typography.Title style={{ margin: 0, padding: 0 }} level={5}>
                About me
              </Typography.Title>
              <Space size={'middle'} direction='vertical'>
                <Row
                  justify={'space-between'}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  key={ABOUT_ME.name}
                  style={{
                    borderBottom: '0.5px solid black',
                    paddingBottom: token.paddingXXS,
                    margin: 0,
                    width: '20em',
                  }}
                >
                  <Col
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: 0,
                    }}
                  >
                    <Typography.Text>{ABOUT_ME.name}</Typography.Text>
                  </Col>
                  <Col>
                    <Space>
                      <Tooltip title='LinkedIn'>
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: token.colorPrimaryBgHover,
                          }}
                          size='small'
                          shape='circle'
                          icon={<LinkedinOutlined />}
                          href={ABOUT_ME.linkedIn}
                        />
                      </Tooltip>
                      <Tooltip title='GitHub'>
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: token.colorPrimaryBgHover,
                          }}
                          size='small'
                          shape='circle'
                          icon={<GithubOutlined />}
                          href={ABOUT_ME.gitHub}
                        />
                      </Tooltip>
                    </Space>
                  </Col>
                </Row>
              </Space>
            </Space>
          </Space>
        </Col>
        <Col span={12}>
          <Space size={'large'} align={'start'} direction={'vertical'}>
            <Typography.Title style={{ margin: 0, padding: 0 }} level={5}>
              Fu*k russia
            </Typography.Title>
            <Image
              style={{ width: '20em' }}
              src='https://media.giphy.com/media/0SPa3c91z2l1giDIMH/giphy.gif'
              alt='Ukraine'
            />
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};
