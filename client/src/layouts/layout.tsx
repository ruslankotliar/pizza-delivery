import React from 'react';
import {
  Breadcrumb,
  Layout,
  Menu,
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
import { TEAM_KEYS } from '../consts';

const { Header, Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
}

export const LayoutComponent: React.FC<Props> = ({ children }) => {
  const { token } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          display: 'flex',
          justifyContent: 'space-between',
          top: 0,
          zIndex: 1,
          width: '100%',
          paddingInline: '100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <GiFullPizza color={token.colorPrimary} fontSize='3em' />
          <Typography.Title
            style={{
              color: token.colorPrimary,
              padding: 0,
              margin: 0,
              marginLeft: token.marginMD,
            }}
          >
            Pizza Delivery
          </Typography.Title>
        </div>
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['2']}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`,
          }))}
        />
      </Header>
      <Content className='site-layout' style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: token.colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
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
              © 823 Code & Coffee Team. All rights reserved
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
