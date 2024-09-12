import {
    UserOutlined,
    SolutionOutlined,
    CameraOutlined,
  } from "@ant-design/icons";
  import { PhoneInput } from 'react-international-phone';
  import 'react-international-phone/style.css';   
  import {
    DatePicker,
    Form,
    Input,
    Select,
    Row,
    Col,
  } from "antd";
  import React, { useState, FC } from "react";
  import type { FormInstance } from "antd/es/form";
  import styles from "./RegisterLayout.module.css";
  // import './customStyle.css';
  


const { TextArea } = Input;
const { Option } = Select;
interface ProfileStepProps {
  form: FormInstance<any>;
}

const ProfileStep: React.FC<ProfileStepProps> = ({ form }) => {
   
    const [phone, setPhone] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [hasError, setHasError] = useState(false);

    // const isValid = isPhoneValid(phone);
    const universities =
     ['Zagazig', 'Mansoura', 'Banha','BUE', 'Ain Shams', 'Assiut', 'AUC','Cairo','Alexandria','FUE','Al-Azhar'
      ,'Helwan','Fayoum','Beni-Suef','Aswan','Tanta','Kafrelsheikh','Egypt-Japan University of Science and Technology','GUC'
      ,'Nile University','MIU','Minia',
    ];

    const graduationYears = Array.from({ length: 11 }, (_, i) => 2020 + i);
  
    return (
        <>
      {/* <Row > */}
          <Form.Item    
          
          style={{color:'#fff'}}
            name="first_name"
            label={<label >First Name</label>}
            // layout="vertical"
            rules={[{ required: true, message: 'Please enter your first name' },
              {min:3 , message: 'at least 3 characters long'}]}
          >
            <Input placeholder="Enter your first name" className={styles.customInput} />
          </Form.Item>
      

        {/* Last Name */}
        
          <Form.Item    
           label={<label >last Name</label>}
            name="last_name"
            rules={[{ required: true, message: 'Please enter your last name' },
              {min:3 , message: 'at least 3 characters long'}
            ]}
          >
            <Input placeholder="Enter your last name" className={styles.customInput} />
          </Form.Item>
        
      {/* </Row> */}
      
      <Form.Item    
        name="bio"

        label={<label >Bio</label>}
        rules={[{ required: true, message: 'Please enter your bio' }
          ,
              {min:10 , message: 'bio must be at least 10 characters long'}
        ]}
      >
        <TextArea rows={4}
        showCount
        maxLength={100}
        className={styles.customBio}
        placeholder="Write a short bio about yourself" style={{ height: 60, resize: 'none' }} />
      </Form.Item>
      <Col span={24}>
        <Form.Item    
   label={<label >Phone Number</label>}
   className="custom-phone-field"
        name="phone_number"
        rules={[{ required: true, message: 'Please enter your phone number' },
        ]}>
          <PhoneInput
            defaultCountry="eg"
            value={phone}
            style={{
              border: 'none',
              outline: 'none',
               width: '100%',
            }}
            onChange={(phone) => {
              setPhone(phone);
              console.log("hi");
            }} 
           
             />
             {/* {!isValid && <div style={{ color: 'red' }}>Phone is not valid</div>} */}
        </Form.Item>
        </Col>
      {/* Birth Date */}
      <Form.Item     
        name="birthdate"
        label={<label >Birth date</label>}
        rules={[{ required: true, message: 'Please select your birth date' },{
          // just for fun
          validator: (_, value) =>
              value && value.year() > 2020
              ? Promise.reject(new Error('You cannot be this young!'))
              : Promise.resolve(),
        },]}
        
      >
        <DatePicker  style={{ width: '100%' }} className={styles.customInput} placeholder=" birth date"  onChange={(date)=>{console.log(date);
        // console.log(new Date(date).toISOString());
        // setBirthDate(new Date(date).toISOString()) 
      }}
          
            />
      </Form.Item>

      {/* University */}
      <Form.Item    
        label={<label >University</label>}
        name="university"
        rules={[{ required: true, message: 'Please select your university' }]}
      >
        <Select placeholder="Select your university"
         showSearch
         filterOption={(input, option) =>
           (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
         }
        className={styles.selectCustom}
        >
          {universities.map((uni) => (
            <Option key={uni} value={uni}>
              {uni}
            </Option>
          ))}
        </Select>
       
      </Form.Item>


      <Row  >     
      {/* Faculty */}
      
      <Form.Item    
        name="faculty"
        // className={styles.customAlign}
        rules={[{ required: true, message: 'Please enter your faculty' }]}
        style={{
          marginRight: 5,
        }}
        
      >
        <Input placeholder="faculty"   className={styles.customAlign}  />
      </Form.Item>
      {/* Faculty Department */}
      <Form.Item    
        name="faculty_department"
        rules={[{ required: true, message: 'Please enter your faculty department' }]}
      >
        <Input placeholder="faculty department"    className={styles.customAlign} />
      </Form.Item>
      </Row>
      
      {/* Graduation Year */}
     
      <Form.Item    
   label={<label >graduation year</label>}
        name="graduation_year"
        rules={[{ required: true, message: 'Please select your graduation year' }]}
      >
        <Select 
        placeholder="select your graduation year"
        showSearch
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
        className={styles.customSelect}>
          {graduationYears.map((year) => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>
        
      </Form.Item>
      </>
    );
  };
  
export default ProfileStep;