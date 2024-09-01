import React from "react";
import {
  Button,
  Input,
  Checkbox,
  Form,
  InputNumber,
  Modal,
  notification,
  FormProps,
  Radio,
  DatePicker,
} from "antd";
import moment from "moment";
import axios from "axios";

type FieldType = {
  email: string;
  password: string;
  name: string;
  address: string;
  contact: string;
  role: string;
  profession: string;
  datePicker: any;
  gender: string;
};

export const Signup = () => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const payload = {
      ...values,
      role: "service_provider",
      dob: moment(values.datePicker.$d).format("L"),
    };
    try {
      const result = await axios.post("api/auth/signup", payload);
      notification.success({
        message: "Sign Up success",
        description: result.data.message,
      });
    } catch (error: any) {
      notification.error({
        message: "Sign Up",
        description: error.response.data.message,
      });
    }
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 700, width: "100%" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={undefined}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Mobile Number"
          name="contact"
          rules={[{ required: true, message: "Please input your number" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Radio.Group>
            <Radio value="male"> Male </Radio>
            <Radio value="female"> Female </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="DatePicker"
          name="datePicker"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType>
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Profession"
          name="profession"
          rules={[{ required: true, message: "Please input your profession" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
