import { PageContainer } from '@ant-design/pro-components';
import { Button, Drawer, Form, Table, Input } from 'antd';
import { useEffect, useState } from 'react';
import { $get } from '../../utils/request';
import styles from './index.less';

const { TextArea } = Input;
const EntertainmentPage: React.FC = () => {
  const [form] = Form.useForm();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const changeDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };
  const getAllList = () => {
    $get('/communicate/getCollectiveList').then((res) => {
      if (Array.isArray(res)) {
        setDataSource(res);
      }
    });
  };
  const deleteUser = (_id: number) => {
    $get('/admin/deleteCommunicate', { postId: _id }).then(() => {
      getAllList();
    });
  };
  useEffect(() => {
    getAllList();
  }, [drawerOpen]);

  const onFinish = (values: any) => {
    $get('/addOrUpdateUserInfo', values).then(() => {
      changeDrawerOpen();
      getAllList();
    });
  };

  //   const onFinishFailed = (errorInfo: any) => {
  //     console.log('Failed:', errorInfo);
  //   };
  const columns = [
    {
      title: '发表人',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '帖子内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '点赞数',
      dataIndex: 'likeNum',
      key: 'likeNum',
    },

    {
      title: '设置',
      render: (_value: any) => (
        <div className={styles.modify}>
          <Button danger onClick={() => deleteUser(_value?.messageID)}>
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageContainer ghost>
      <div className={styles.container}>
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
              <Form.Item label="公告内容" name="content">
                <TextArea rows={4} maxLength={6} />
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

export default EntertainmentPage;
