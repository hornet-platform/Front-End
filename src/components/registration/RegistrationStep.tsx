import React from 'react';
import { Button, Form, Input,Col } from 'antd';
import { FormInstance } from 'antd/es/form';


const APIkey =  import.meta.env.VITE_HORNET_API;

export interface FieldType {
    username: string;
    email: string;
    password: string;
}

interface FirstStepProps {
    nextStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
    form: FormInstance<FieldType>;  
}

const RegistrationStep: React.FC<FirstStepProps> = ({ nextStep,form }) => {



    const validateUserHandler = async () =>{
        const res = await fetch(`${APIkey}/users/check-username`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: form.getFieldValue("username")})
            })
            const data = await res.json()
            console.log("data", data)
            console.log("res", res)
            if(res.status === 200){
                form.setFields([{
                    name: "username",
                    errors: []
                }])
            }else if (res.status == 409) {
                form.setFields([{
                    name: "username",
                    errors: [data.detail],
                }]);
            } 
            
            else if (res.status == 422) {
                form.setFields([{
                    name: "username",
                    errors: [data.detail[0].msg],
                }]);
            }
    }
    console.log(validateUserHandler)

    return (
    <>
        <>
        <Col span={24}>
            <Form.Item<FieldType>
            label= 'User Name'
            name="username"            
            rules={[
                { message: 'Please input your username!',required: true },
                {whitespace:true},

            ]}
            >
            <Input 
                placeholder="UserName"
                onBlur={validateUserHandler}
            />
            </Form.Item>
            <Form.Item<FieldType>
            name="password"
            label= 'Password'
            rules={[
                { message: 'Please input your password!', required: true },
                { min: 6, message: 'Password must be at least 6 characters long' },
                { validator: (_, value) => {
                    if (!/[a-zA-Z]/.test(value)) {
                        return Promise.reject('Password must contain at least one letter');                    
                    
                    }
                    return Promise.resolve();
                }
            
            }
            ]}
            >
            <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item<FieldType>
            name="email"
            label="Email"
            rules={[{ message: 'Please input your email!', required: true},
                {type: 'email', message: 'Please enter valid email'}
            ]}
            hasFeedback
            >
            <Input placeholder="Email" />
            </Form.Item>
            <Form.Item>
            <Col span={12} style={{ justifySelf: "flex-end" }}>

            <Button 
                type="primary" 
                htmlType="submit" 
                onClick={nextStep}
                name='next'
            >
                Next
            </Button>
            </Col>
            </Form.Item>
            </Col>
        </>
        </>
);
};

export default RegistrationStep;



