import { useState } from "react";

interface UserData {
    username: string;
    email: string;
    password: string;
    bio: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    birthdate: string |Date; //Date => gonna fix it
    university: string;
    faculty: string;
    faculty_department: string;
    graduation_year: number;
  }
//  i got no idea 

export function RegisterForm(steps : React.ReactNode[]){
const [currentStepIndex , setCurrentStepIndex] = useState(0);

function back(){
    setCurrentStepIndex((i:number) => {
        if (i <= 0) return i; 
        return i - 1;
    });
}

function next():void {
    setCurrentStepIndex((i:number) => {
        if (i >= steps.length - 1) return i; 
        return i + 1;
    });
    
}

function setCookie(name: string, value: string, daysToExpire: number): void  {
    const expires = new Date();
    expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }



const handleSubmit = async (values: UserData): Promise<void> => {
  console.log(values);
    const birthDate = values.birthdate 
    ? new Date(values.birthdate.toString()).toISOString() 
    : new Date().toISOString();
  const userData: {
      password: string;
      birthdate: string;
      university: string;
      bio: string;
      email: string;
      username: string;
      faculty: string
  } = {
    username: values.username,
    email: values.email,
    password: values.password,
    bio: values.bio,
    birthdate : birthDate, 
    university: values.university,
    faculty: values.faculty,

  };
    console.log('Form values:', values);
    console.log(userData)
    try {
      const response = await fetch("https://respective-helena-mutex-89d4a59b.koyeb.app/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  

      if (!response.ok) {
        throw new Error('Signup request failed');
      }

      const data = await response.json();
      console.log(data);
  
      const accessToken = data.access_token;
      const expirationDays = 7; 
      setCookie("user", accessToken, expirationDays);
    } catch (error) {
        console.error('An error occurred:', error);
      }
}

function goTo(index : number){
setCurrentStepIndex(index);
}


return {
    currentStepIndex,
    step : steps[currentStepIndex],
    steps,
    goTo,
    next,
    back,handleSubmit
}
}