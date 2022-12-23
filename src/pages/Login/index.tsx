import { $get } from '@/utils/request';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'umi';
import styles from './index.less';
const Login = () => {
  let navigate = useNavigate();
  const jump = () => {
    navigate('/Info', { replace: true });
  };
  const onFinish = (values: any) => {
    $get('/admin/login', { values })
      .then(() => {
        jump();
      })
      .catch(() => {
        message.error('请检查账号密码！');
      });
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
            确认
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
