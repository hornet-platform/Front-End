import React from "react"
import { Button, Form, Input,Divider, Typography } from 'antd';
import Registeration from "../registration/Registeration";
import  Style  from "../registration/registration.module.css";


interface LoginType {
    username: string,
    password: string
}

const { Paragraph, Link,Title } = Typography;

const Login: React.FC = () => {

const [formInstance] = Form.useForm<LoginType>()

    return (
        <>
            <div className={Style.back}>
            <div className={`${Style.circle} ${Style.circle1}`}></div>
            <div className={`${Style.circle} ${Style.circle2}`}></div>
            <div className={`${Style.circle} ${Style.circle3}`}></div>
            <div className={`${Style.circle} ${Style.circle4}`}></div>
            <div className={`${Style.circle} ${Style.circle5}`}></div>
        </div>
        <Form
            name="registeration"
            form={formInstance}
            initialValues={{ remember: true }}
            className={Style.form}
            layout="vertical"
            style={{
                maxWidth: 500,
                margin: 'auto',
                alignSelf: "center",
                padding: 40,
                paddingBottom: 40,
                boxShadow: "0 0 12px #ccc",
                borderRadius: 12,
            }}>
        <Form.Item<LoginType>
            label= 'User Name or E-mail'
            name="username"            
            rules={[
                { message: 'Please input your username or E-mail !',required: true },
                {whitespace:true},

            ]}
            >
            <Input 
                placeholder="UserName"
            />
            </Form.Item>
            <Form.Item<LoginType>
            name="password"
            label= 'Password'
            rules={[
                { message: 'Please input your password!', required: true },
                { min: 6, message: 'Password must be at least 6 characters long' },
            ]}
            >
            <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item>
            <Button 
                type="primary" 
                htmlType="submit" 
                name='login'
            >
                Login
            </Button>
            </Form.Item>
            <Form.Item>
                <Paragraph>Don't have an account?
                    <Link href="">
                    <h4>Registeration</h4>
                    </Link>
                </Paragraph>
            </Form.Item>
        </Form>
        </>
    )
}

export default Login