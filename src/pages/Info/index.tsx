import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Popconfirm,
  Radio,
  Table,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { $get, $post } from '../../utils/request';
import styles from './index.less';

const InfoPage: React.FC = () => {
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const changeDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const setAdmin = (_value: any) => {
    $post('/admin/setAdmin', _value).then(() => {
      message.success('设置成功！');
    });
  };
  // const getAllList = () => {
  //   $get('/admin/getUserInfoList').then((res) => {
  //     if (Array.isArray(res)) {
  //       setDataSource(res);
  //     }
  //   });
  // };
  // const deleteUser = (_id: number) => {
  //   $get('/admin/deleteUserInfo', { id: _id }).then((res) => {
  //     if (Array.isArray(res)) {
  //       setDataSource(res);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   getAllList();
  // }, [drawerOpen]);

  // const onFinish = (values: any) => {
  //   $get('/admin/addOrUpdateUserInfo', values).then(() => {
  //     changeDrawerOpen();
  //     getAllList();
  //   });
  // };

  const getAllList = () => {
    $get('/admin/getUserList').then((res) => {
      if (Array.isArray(res.data.data)) {
        setDataSource(res.data.data);
      }
    });
  };
  const deleteUser = (_id: number) => {
    $post('/admin/deleteUser', { id: _id }).then(() => {
      getAllList();
    });
  };

  useEffect(() => {
    getAllList();
  }, [drawerOpen]);

  const onFinish = (values: any) => {
    console.log('##' + values);
    $post('/admin/updateUser', values).then(() => {
      changeDrawerOpen();
      getAllList();
    });
  };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log('Failed:', errorInfo);
  //   };
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '身份证',
      dataIndex: 'idCard',
      key: 'idCard',
    },
    {
      title: '电话号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (_value: string) => _value,
    },
    {
      title: '密码',
      dataIndex: 'pwd',
      key: 'pwd',
    },
    {
      title: '账号名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '记录日期',
      dataIndex: 'date',
      key: 'date',
      render: (_val: string) => {
        return moment(_val).format('YYYY-MM-DD');
      },
    },
    {
      title: '设置',
      render: (_value: any) => (
        <div className={styles.modify}>
          <Button
            type="primary"
            onClick={() => {
              console.log('######:', _value);
              form.setFieldsValue({ ..._value, date: moment(_value.date) });
              changeDrawerOpen();
            }}
          >
            修改
          </Button>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => deleteUser(_value?.id)}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <Button style={{ marginLeft: 5 }} danger>
              删除
            </Button>
          </Popconfirm>
          {localStorage.getItem('user') === 'mainAdmin' && (
            <Button
              type="primary"
              style={{ marginLeft: 5 }}
              onClick={() => {
                setAdmin(_value);
              }}
            >
              设为管理员
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        {/* <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            changeDrawerOpen();
          }}
        >
          新增
        </Button> */}
        <Table dataSource={dataSource} columns={columns} />
      </div>
      <Drawer
        title="信息修改"
        height="98vh"
        placement={'bottom'}
        closable={false}
        onClose={changeDrawerOpen}
        open={drawerOpen}
        // key={placement}
      >
        <div className={styles.drawerWarp}>
          <div className={styles.formWarp}>
            <Form
              form={form}
              //   labelCol={{ span: 8 }}
              //   wrapperCol={{ span: 16 }}
              //   initialValues={{ remember: true }}
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="姓名"
                name="name"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="账号名"
                name="username"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hidden
                // label="身高"
                name="id"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              ></Form.Item>
              <Form.Item
                label="身份证"
                name="idCard"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="电话号码"
                name="phone"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="密码"
                name="pwd"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="记录日期" name="date">
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="角色"
                name="role"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Radio.Group>
                  <Radio value={'mainAdmin'}>主管理</Radio>
                  <Radio value={'admin'}>管理员</Radio>
                  <Radio value={'parent'}>父母</Radio>
                  <Radio value={'child'}>儿子</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  提交
                </Button>
                <Button
                  type="dashed"
                  onClick={() => {
                    form.resetFields();
                    changeDrawerOpen();
                  }}
                  style={{ marginLeft: '10px' }}
                >
                  关闭
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Drawer>
    </PageContainer>
  );
};

export default InfoPage;
