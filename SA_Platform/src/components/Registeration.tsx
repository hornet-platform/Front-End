import Style from './registration.module.css';
import React ,{useState} from "react";
import {Form ,Steps ,Divider} from 'antd'
import { 
    UserOutlined,
    SolutionOutlined,
} from "@ant-design/icons";
import RegistrationStep , { FieldType } from "./RegistrationStep";
import ProfileStep from './ProfileStep';




const Registeration: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [formInstance] = Form.useForm<FieldType>();  


    console.log(formInstance)
    


    const handleStep =async (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttonName = e.currentTarget.name
        console.log(buttonName)
        e.preventDefault(); 

        try {
            if(buttonName === 'next'){
                await formInstance.validateFields() 
                setCurrentStep(prevStep => prevStep + 1);
            }
        } catch (err) {
            console.log('Validation failed:', err);
        }
        if(buttonName === 'previous'){
            setCurrentStep(prevStep => prevStep - 1);
        }
    };


    


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
            }}

        >
            <Divider
            orientation="center"
            plain
            style={{
                borderBlockColor: "#0077fd",
                fontSize: 25,
            }}
            >
            IEEE
            </Divider>

            <Steps
            current={currentStep} 
            items={[
                {
                title: "Register",
                status: currentStep == 0 ? "finished" : "done",
                icon: <UserOutlined />,
                },
                {
                title: "Profile",
                status: currentStep == 1 ? "finished" : "wait",
                icon: <SolutionOutlined />,
                },
            ]}
            style={{
                marginBottom: 25,
            }}
            />

            { currentStep === 0 &&                  
                (
                <RegistrationStep nextStep={handleStep} form={formInstance} />
                

            )}  
            { currentStep === 1 &&                  
                (<ProfileStep previousStep={handleStep}  form={formInstance}/>
            )}      
        </Form>
        </>

    )
}


export default Registeration

