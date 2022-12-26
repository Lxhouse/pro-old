import { PageContainer } from '@ant-design/pro-components';
import { Button, Drawer, Form, Table, Input, Popconfirm, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { $get } from '../../utils/request';
import styles from './index.less';

const DrugPage: React.FC = () => {
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const changeDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const getAllList = () => {
    $get('/admin/getMedicalList').then((res) => {
      if (Array.isArray(res.data.data)) {
        setDataSource(res.data.data);
      }
    });
  };
  const deleteUser = (_id: number) => {
    $get('/admin/deleteMedical', { id: _id }).then(() => {
      getAllList();
    });
  };
  useEffect(() => {
    getAllList();
  }, [drawerOpen]);

  const onFinish = (values: any) => {
    $get('/admin/addOrUpdateMedical', values).then(() => {
      changeDrawerOpen();
      getAllList();
    });
  };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log('Failed:', errorInfo);
  //   };
  const columns = [
    {
      title: '主要成分',
      dataIndex: 'mainComponent',
      key: 'mainComponent',
    },
    {
      title: '药品名称',
      dataIndex: 'medName',
      key: 'medName',
    },
    {
      title: '克数/片数 mg * 10片',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '是否处方药',
      dataIndex: 'prescription',
      key: 'prescription',
      render: (_value: number) => <div>{_value === 1 ? '是' : '否'}</div>,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '药品分类',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '设置',
      render: (_value: any) => (
        <div className={styles.modify}>
          <Popconfirm
            title="确定删除吗？"
            onConfirm={() => deleteUser(_value?.id)}
            onCancel={() => {}}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Button
          type="primary"
          onClick={() => {
            form.resetFields();
            changeDrawerOpen();
          }}
        >
          新增
        </Button>
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
              //   labelCol={{ span: 8 }}
              //   wrapperCol={{ span: 16 }}
              //   initialValues={{ remember: true }}
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item label="主要成分" name="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item label="主要成分" name="mainComponent">
                <Input />
              </Form.Item>
              <Form.Item label="药品名称" name="medName">
                <Input />
              </Form.Item>
              <Form.Item label="克数/片数 mg * 10片" name="number">
                <Input />
              </Form.Item>
              <Form.Item label="是否处方药 " name="prescription">
                <Radio.Group name="radiogroup" defaultValue={1}>
                  <Radio value={0}>是</Radio>
                  <Radio value={1}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="价格 " name="price">
                <Input />
              </Form.Item>
              <Form.Item label="药品分类 " name="sort">
                <Input />
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

export default DrugPage;
