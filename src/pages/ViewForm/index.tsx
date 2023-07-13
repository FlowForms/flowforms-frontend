// import { useState } from 'react';
import logo3 from '../../Images/logo3.webp'
import ViewQuestion from './ViewQuestion';
import { RiSendPlane2Line } from 'react-icons/ri';
// import { Form } from '../../types/Form';
// import { QuestionType } from '../../../types/Form'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

interface FormValues {
    [key: string]: string;
}

const index = () => {

    const arr = [
        {
            "title": "What is your name?",
            "description": "Please enter your full name",
            "type": "shortAnswer",
            "required": true,
            "properties": {
                "placeholder": "Your Answer"
            },
            "formFieldId": "121"
        },
        {
            "title": "What do you study?",
            "description": "Please add details about your course",
            "type": "longAnswer",
            "required": false,
            "properties": {
                "placeholder": "Your Answer"
            },
            "formFieldId": "123"
        },
        {
            "title": "What is your name?",
            "description": "Please enter your full name",
            "type": "singleOption",
            "required": false,
            "properties": {
                "options": ["Option 1", "Option 2", "Option 3"]
            },
            "formFieldId": "singleOption"
        },
        {
            "title": "What is your name?",
            "description": "Please enter your full name",
            "type": "multipleOption",
            "required": false,
            "properties": {
                "options": ["Option 1", "Option 2", "Option 3"]
            },
            "formFieldId": "1234"
        },
        {
            "title": "What is your email?",
            "description": "Please enter your email",
            "type": "email",
            "required": false,
            "properties": {
                "placeholder": "Your Email"
            },
            "formFieldId": "12345"
        }
    ];


    const validationSchema = Yup.object().shape(
        Object.fromEntries(
            arr.map((element) => {
                let yupSchema;

                if (element.type === 'shortAnswer') {
                    element.required
                        ? yupSchema = Yup.string().required('Required').max(150, 'Maximum 150 characters allowed')
                        : yupSchema = Yup.string().max(150, 'Maximum 150 characters allowed')
                }
                else if (element.type === 'longAnswer') {
                    element.required
                        ? yupSchema = Yup.string().required('Required').max(1000, 'Maximum 1000 characters allowed')
                        : yupSchema = Yup.string().max(1000, 'Maximum 1000 characters allowed')
                }
                else if (element.type === 'singleOption') {
                    element.required
                        ? yupSchema = Yup.string().required('Required')
                        : yupSchema = Yup.string()
                }
                else if (element.type === 'multipleOption') {
                    element.required
                        ? yupSchema = Yup.array().min(1, 'Please select at least one option').required('Required')
                        : yupSchema = Yup.array()
                }
                else if (element.type === 'email') {
                    element.required
                        ? yupSchema = Yup.string().required('Requied').email('Must be a valid email address')
                        : yupSchema = Yup.string().email('Must be a valid email address')
                }
                else {
                    yupSchema = Yup.string();
                }
                return [element.formFieldId, yupSchema];
            })
        )
    );

    const initialValues: FormValues = Object.fromEntries(
        arr.map((element) => [element.formFieldId, ''])
    );

    const onSubmit = (values: FormValues) => {
        // Handle form submission here
        console.log(values);
    };

    const form1 = { thumbnailUrl: logo3, backgroundColor: "", backgroundUrl: null, font: "", questions: arr, title: "Testing Form" };
    return (
        <div className="w-full bg-white flex justify-center items-center">
            <div className=" fixed w-[3000px] h-2/3 -top-10 -rotate-12" 
            style={{ 
                background: 'radial-gradient(100% 50% at 50% 50%, #FF5E5D70 0%, #FF5E5D00 100%)',
            }} 
            ></div>

            <div className="flex flex-col z-10 bg-white justify-center items-center border shadow-2xl w-full rounded-2xl shadow-indigo-00 p-8 mt-5 sm:mt-12 max-w-[760px] mb-[75px] md:mb-[150px] mx-5 sm:mx-12">
                <div className="flex flex-col w-full space-y-5 mb-2 ">
                    <div className="flex flex-row w-full justify-start">
                        <img src={form1.thumbnailUrl} alt="logo3" className='h-20 w-20 rounded-full' />
                    </div>
                    <div className="flex flex-row w-full text-3xl font-bold ">
                        {form1.title}
                    </div>
                </div>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    {({ isValid, dirty }) => (
                        <Form className='w-full'>
                            {arr.map((question, index) => (
                                <ViewQuestion key={index} question={question} />
                            ))}
                            <div className="flex w-full justify-end">
                                <button type="submit" disabled={!isValid || !dirty} className={`bg-black text-white flex items-center gap-2 p-2.5 rounded-xl font-bold px-6 ${(!isValid || !dirty) ? "opacity-60" : "opacity-100"} transition duration-100 my-4 mb-10`}>
                                    Submit
                                    <RiSendPlane2Line className="text-white" />
                                </button>
                            </div>
                        </Form>

                    )}
                </Formik>
                <div>Powered by <span className='font-bold' > deform.cc</span></div>
            </div>
        </div>
    )
}

export default index