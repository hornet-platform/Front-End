import React from 'react';
import { Form, Input, Col } from 'antd';
import { FormInstance } from 'antd/es/form';
import styles from "./RegisterLayout.module.css";

export interface FieldType {
  username: string;
  email: string;
  password: string;
}

interface FirstStepProps {
  form: FormInstance<FieldType>;  
}

const RegisterLayoutFirstStep: React.FC<FirstStepProps> = ({ form }) => {
  const validateUserHandler = async () => {
    const res = await fetch(
      'https://respective-helena-mutex-89d4a59b.koyeb.app/users/check-username',
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: form.getFieldValue("username")})
      });
    const data = await res.json();

    if (res.status === 200) {
      form.setFields([{ name: "username", errors: [] }]);
    } else if (res.status == 409) {
      form.setFields([{ name: "username", errors: [data.detail] }]);
    } else if (res.status == 422) {
      form.setFields([{ name: "username", errors: [data.detail[0].msg] }]);
    }
  };

  return (
    <Col span={24}>
      <Form.Item<FieldType>
        label="User Name"
        name="username"
        className={styles.customInput}
        rules={[{ required: true, message: 'Please input your username!' }, { whitespace: true }]}
      >
        <Input placeholder="UserName" onBlur={validateUserHandler} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        className={styles.customInput}
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters long' },
          {
            validator: (_, value) => {
              if (!/[a-zA-Z]/.test(value)) {
                return Promise.reject('Password must contain at least one letter');
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input.Password placeholder="Password"  />
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        className={styles.customInput}
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter valid email' }
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
    </Col>
  );
};

export default RegisterLayoutFirstStep;
