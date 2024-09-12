import React, { useState } from "react";
import { Button, Form, Steps, Row, Col, Divider } from "antd";
import { UserOutlined, SolutionOutlined } from "@ant-design/icons";
import ProfileStep from './ProfileStep';
// import RegisterLayoutFirstStep from './RegisterLayoutFirstStep';
// import { RegisterForm } from "./RegisterForm";
import styles from "./RegisterLayout.module.css";


interface UserData {
  username: string;
  email: string;
  password: string;
  bio: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birthdate: string | Date;
  university: string;
  faculty: string;
  faculty_department: string;
  graduation_year: number;
}
const apiUrl = import.meta.env.VITE_HORNET_API;
const RegisterLayout: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    username: "",
    email: "",
    password: "",
    bio: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    birthdate: "",
    university: "",
    faculty: "",
    faculty_department: "",
    graduation_year: 0,
  });

  const [form] = Form.useForm();

  const steps = [
    // <RegisterLayoutFirstStep form={form} />,
    <div>first step</div>,
    <ProfileStep form={form} />,
  ];

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prevData) => ({
        ...prevData,
        ...values,
      }));
      setCurrentStepIndex((i) => i + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handlePrevious = () => {
    setCurrentStepIndex((i) => i - 1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const combinedData = { ...formData, ...values };
console.log(combinedData);
      const birthDate = combinedData.birthdate
        ? new Date(combinedData.birthdate).toISOString()
        : new Date().toISOString();

      const userData: UserData = {
        ...combinedData,
        birthdate: birthDate,
      };

      console.log("Final form data:", userData);

      const response = await fetch(`${apiUrl}/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }

      const data = await response.json();
      console.log(data);

      // still need to check 
      const accessToken = data.access_token;
      document.cookie = `user=${accessToken};path=/;expires=${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toUTCString()}`;
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  return (
    <>
      <div className={styles.area}>
        <ul className={styles.circles}>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
      <div className={styles.formContainer}>
        <Form form={form} className={styles.form}>
          <Divider
            orientation="center"
            plain
            style={{
              borderBlockColor: "#eee",
              fontSize: 25,
              fontWeight: 'bold',
              color: '#5865f2'
            }}
          >
            Hornet
          </Divider>
          <Steps
            items={[
              {
                title: <span className={styles.customStepRegister}>Register</span>,
                status: currentStepIndex === 0 ? "process" : "done",
                icon: <UserOutlined className={styles.customStepRegisterIcon} />,
              },
              {
                title: <span className={currentStepIndex === 1 ? styles.customStepProfile : ''}>Profile</span>,
                status: currentStepIndex === 1 ? "process" : "wait",
                icon: <SolutionOutlined className={currentStepIndex === 1 ? styles.customStepProfileIcon : ''} />,
              }
            ]}
            style={{
              marginBottom: 25,
              color: '#4e54c8',
              fontWeight: 'bold',
            }}
          />
          <Row gutter={[16, 12]} className={styles.mainRow}>
            <div className={styles.currentStep}>
            {steps[currentStepIndex]}
            </div>
          </Row>
        

        <div>
          {currentStepIndex > 0 && (
            <Button onClick={handlePrevious}>Previous</Button>
          )}
          {currentStepIndex < steps.length - 1 && (
            <Button onClick={handleNext}>Next</Button>
          )}
          {currentStepIndex === steps.length - 1 && (
            <Button type="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </div>
      </Form>

    </div>
    </>
  );
}
export default RegisterLayout;