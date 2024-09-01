"use client";
import { Button, Checkbox, Form, Input } from "antd";
import Sewaverse from "../../../assets/images/Sewaverse.png";
import serviceImg from "../../../assets/images/login.png";
import React from "react";
import Image from "next/image";

export const Login = () => {
  return (
    <div className="flex items-center justify-center  bg-gray-800 rounded-xl">
      <div className="bg-white shadow-lg flex rounded-xl">
        <div
          className="w-1/2 bg-gray-100 p-8 backgroundImage text-white flex justify-between flex-col"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) ,url(${serviceImg.src})`,
            borderRadius: "10px 0 0 10px",
          }}
        >
          <h1 className="text-3xl">Sewaverse</h1>
          <div className="mt-4">
            <div>
              <h2 className="text-5xl font-bold">Get</h2>
              <h2 className="text-5xl font-bold">Every Services</h2>
              <h2 className="text-5xl font-bold">You Want!</h2>
            </div>
            <p className="mt-2">
              Book reliable pros for anything from plumbing to personal care,
              all in one easy platform.
            </p>
          </div>
        </div>

        <div className="w-1/2 p-8 relative">
          <div className="text-center mb-8 flex justify-center items-center flex-col">
            <Image
              src={Sewaverse}
              alt={"Sewa Verse"}
              width={70}
              className="mb-4"
            />
            <h2 className="text-xl font-400">Welcome back!</h2>
            <p>Please login to your account to continue</p>
          </div>
          <Form
            name="login"
            initialValues={{ remember: true }}
            className="space-y-6"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="Email Address" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item className="flex justify-between">
              <Checkbox>Remember me</Checkbox>
              <a href="/">Forgot Password?</a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Login
              </Button>
            </Form.Item>
          </Form>
          <div className="text-center mt-4">
            <p>
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
