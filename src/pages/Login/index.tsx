import styles from './index.less';
import { Button, Form, Input } from 'antd';
import { $get } from '@/utils/request';
const Login = () => {
  const onFinish = (values: any) => {
    $get('/admin/login', { values }).then(() => {});
  };

  return (
    <div className={styles.warp}>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="userName"
          rules={[{ required: true, message: '请输入你的账号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pwd"
          rules={[{ required: true, message: '请输入你的密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
