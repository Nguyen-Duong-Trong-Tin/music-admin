import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";

import userService from "../../../services/user";
import configs from "../../../configs";
import cookieHelper from "../../../helpers/cookie";

type FieldType = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    try {
      const email = values.email;
      const password = values.password;

      const response = await userService.login(email, password);
      if (response.status !== 200) {
        toast.error("Có lỗi xảy ra!");
        return;
      }

      cookieHelper.set("accessToken", response.data.data.accessToken, 1000 * 60 * 60 * 24);
      navigate(`/${configs.PATH_ADMIN}`);
    } catch {
      toast.error("Có lỗi xảy ra!");
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    toast.error("Có lỗi xảy ra!");
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ minWidth: 600, backgroundColor: "#ffffff", borderRadius: "20px", padding: "60px 30px" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: "Nhập email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: "Nhập mật khẩu" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login;