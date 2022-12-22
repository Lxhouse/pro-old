import { PageContainer } from '@ant-design/pro-components';
import { Button, Drawer, Form, Input, Table, Radio, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { $get, $post } from '../../utils/request';
import styles from './index.less';

const UserPage: React.FC = () => {
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const changeDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  // const getAllList = () => {
  //   $get('/admin/getUserList').then((res) => {
  //     if (Array.isArray(res)) {
  //       setDataSource(res);
  //     }
  //   });
  // };
  // const deleteUser = (_id: number) => {
  //   $get('/admin/deleteUser', { id: _id }).then((res) => {
  //     if (Array.isArray(res)) {
  //       setDataSource(res);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   getAllList();
  // }, [drawerOpen]);

  // const onFinish = (values: any) => {
  //   $get('/admin/updateUser', values).then(() => {
  //     changeDrawerOpen();
  //     getAllList();
  //   });
  // };

  const getAllList = () => {
    $get('/admin/getUserInfoList').then((res) => {
      if (Array.isArray(res.data.data)) {
        setDataSource(res.data.data);
      }
    });
  };
  const deleteUser = (_id: number) => {
    $post('/admin/deleteUserInfo', { id: _id }).then((res) => {
      if (Array.isArray(res)) {
        setDataSource(res);
      }
    });
  };
  useEffect(() => {
    getAllList();
  }, [drawerOpen]);

  const onFinish = (values: any) => {
    $post('/admin/addOrUpdateUserInfo', values).then(() => {
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
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '血压范围',
      dataIndex: 'bloodScope',
      key: 'bloodScope',
    },
    {
      title: '有无慢性疾病',
      dataIndex: 'chroIll',
      key: 'chroIll',
      render: (_value: number) => (_value === 0 ? '无' : '有'),
    },
    {
      title: '血压范围',
      dataIndex: 'bloodScope',
      key: 'bloodScope',
    },
    // {
    //   title: '记录日期',
    //   dataIndex: 'date',
    //   key: 'date',
    // },
    {
      title: '有无医生诊断报告',
      dataIndex: 'healthImg',
      key: 'healthImg',
      render: (_value: number) => (_value === 0 ? '无' : '有'),
    },
    {
      title: '健康等级',
      dataIndex: 'healthLevel',
      key: 'healthLevel',
      render: (_value: number) => {
        if (_value === 2) {
          return '健康';
        } else if (_value === 1) {
          return '良好';
        } else if (_value === 0) {
          return '差';
        }
      },
    },
    {
      title: '心率范围',
      dataIndex: 'heartScope',
      key: 'heartScope',
    },
    {
      title: '身高',
      dataIndex: 'height',
      key: 'height',
    },
    {
      title: '体重',
      dataIndex: 'weight',
      key: 'weight',
    },
    {
      title: '有无病史',
      dataIndex: 'medicalHistory',
      key: 'medicalHistory',
      render: (_value: number) => (_value === 0 ? '无' : '有'),
    },
    {
      title: '设置',
      render: (_value: any) => (
        <div className={styles.modify}>
          <Button
            type="primary"
            onClick={() => {
              form.setFieldsValue({ ..._value, date: moment(_value.date) });
              changeDrawerOpen();
            }}
          >
            修改
          </Button>
          <Button danger onClick={() => deleteUser(_value?.id)}>
            删除
          </Button>
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
        <Table dataSource={dataSource} columns={columns} />;
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
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                hidden
                // label="身高"
                name="id"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              ></Form.Item>
              <Form.Item
                label="身高"
                name="height"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="体重"
                name="weight"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="年龄"
                name="age"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="血压范围"
                name="bloodScope"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="日期" name="date">
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="有无慢性疾病"
                name="chroIll"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Radio.Group>
                  <Radio value={0}>无</Radio>
                  <Radio value={1}>有</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label="有无医生诊断报告"
                name="healthImg"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Radio.Group>
                  <Radio value={0}>无</Radio>
                  <Radio value={1}>有</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="健康等级"
                name="healthLevel"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Radio.Group>
                  <Radio value={2}>健康</Radio>
                  <Radio value={1}>良好</Radio>
                  <Radio value={0}>差</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="心率范围"
                name="heartScope"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="有无病史"
                name="heartScope"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Radio.Group>
                  <Radio value={0}>无</Radio>
                  <Radio value={1}>有</Radio>
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

export default UserPage;
