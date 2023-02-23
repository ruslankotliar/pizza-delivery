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
} from 'antd';
import { GiFullPizza } from 'react-icons/gi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { NAV_KEYS, ROUTER_KEYS, TEAM_KEYS } from '../consts';
import { useLocation } from 'react-router-dom';
import { throttle } from '../utils';
import { StringParam, useQueryParam } from 'use-query-params';

const { Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent: React.FC<Props> = ({ children }) => {
  const { token } = theme.useToken();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [filter] = useQueryParam('filter', StringParam);

  useEffect(() => {
    console.log(filter);
    if (pathname === '/') {
      const handleScroll = (event: Event) => {
        setScrolled(!!window.scrollY);
      };

      window.addEventListener('scroll', throttle(handleScroll, 300));

      return () => {
        window.removeEventListener('scroll', throttle(handleScroll, 300));
      };
    } else {
      setScrolled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
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
    <Footer style={{ textAlign: 'center' }}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={8}>
          <Space size={'large'} align={'start'} direction={'vertical'}>
            <Space align='end'>
              <Typography.Title style={{ margin: 0, padding: 0 }} level={2}>
                Pizza Delivery
              </Typography.Title>
              <Button
                style={{
                  padding: 0,
                  margin: 0,
                }}
                shape='circle'
                icon={<FaGithub size={'full'} />}
                href={'https://github.com/ruslankotliar/pizza-delivery'}
              />
            </Space>
            <Typography.Text>
              © Code & Coffee Team. All rights reserved
            </Typography.Text>
          </Space>
        </Col>
        <Col span={8}>
          <Space size={'large'} align={'start'} direction={'vertical'}>
            <Typography.Title style={{ margin: 0, padding: 0 }} level={5}>
              Our Team
            </Typography.Title>
            <Space size={'middle'} direction='vertical'>
              {TEAM_KEYS.map((member) => (
                <Row
                  justify={'space-between'}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  key={member.name}
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
                    <Typography.Text>{member.name}</Typography.Text>
                  </Col>
                  <Col>
                    <Space>
                      <Tooltip title='LinkedIn'>
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          size='small'
                          shape='circle'
                          icon={<FaLinkedin />}
                          href={member.linkedIn}
                        />
                      </Tooltip>
                      <Tooltip title='GitHub'>
                        <Button
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          size='small'
                          shape='circle'
                          icon={<FaGithub />}
                          href={member.gitHub}
                        />
                      </Tooltip>
                    </Space>
                  </Col>
                </Row>
              ))}
            </Space>
          </Space>
        </Col>
        <Col span={8}>
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
