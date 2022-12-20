import { PageContainer } from '@ant-design/pro-components';
import { Button, Drawer, Form, Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import { $get, $post } from '../../utils/request';
import styles from './index.less';
import RichText from './RichText';

const SciencePage: React.FC = () => {
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const changeDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const getAllList = () => {
    $get('/communicate/getArticleList').then((res) => {
      if (Array.isArray(res.data)) {
        setDataSource(res.data);
      }
    });
  };
  const deleteUser = (_id: number) => {
    $get('/admin/deleteAnnouncement', { artId: _id }).then((res) => {
      if (Array.isArray(res)) {
        setDataSource(res);
      }
    });
  };
  useEffect(() => {
    getAllList();
  }, [drawerOpen]);

  const onFinish = (values: any) => {
    $post('/admin/addOrUpdateAnnouncement', values).then(() => {
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
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '文章简介',
      dataIndex: 'introduce',
      key: 'introduce',
    },
    {
      title: '设置',
      render: (_value: any) => (
        <div className={styles.modify}>
          <Button
            type="primary"
            onClick={() => {
              $get('/communicate/getArtDetails', { artId: _value?.artId }).then(
                (res) => {
                  form.setFields(res.data);
                  changeDrawerOpen();
                },
              );
            }}
          >
            修改
          </Button>
          <Button danger onClick={() => deleteUser(_value?.artId)}>
            删除
          </Button>
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
              onFinish={onFinish}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label=""
                hidden
                name="artId"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="文章标题"
                name="title"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="文章内容"
                name="content"
                // rules={[
                //   { required: true, message: 'Please input your username!' },
                // ]}
              >
                <RichText />
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
export default SciencePage;
