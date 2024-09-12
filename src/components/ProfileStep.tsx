import React from "react"
import {Space, Form, Button,Input } from "antd"
import { FieldType } from "./RegistrationStep";

interface secondStepProps {
    previousStep: (e:React.MouseEvent<HTMLButtonElement>) => void;
    
}

const ProfileStep: React.FC<secondStepProps> = ({previousStep}) => {
    return (
        <>
            <Form.Item<FieldType>
            name="password"
            rules={[{ message: 'Please input your password!', required: true }]}
            >
            <Input.Password placeholder="Password" />
            </Form.Item>
            <Space>
            <Form.Item>
            <Button 
                type="primary" 
                name="previous"  
                onClick={previousStep}
                htmlType="button"
            >
            Previous
            </Button>
            </Form.Item>
            <Form.Item>
                <Button 
                    type="primary" 
                    htmlType="submit"
                >
                Submit
                </Button>
            </Form.Item>
            </Space>
        </>
    )

}


export default ProfileStep