import { CreateUserSchemaType } from '@/schemas/CreateUserSchemaType';
import { Button, Col, DatePicker, Input, Radio, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

const RegisterPage: Page = () => {

    const {handleSubmit, control, formState: {errors}} = useForm<CreateUserSchemaType>()

    interface FormData{
        email: string,
        birthdayDate: Date,
        gender: string,
        address: string,
        username: string,
        password: string
    }

    function onSubmitForm(){

    }

    return(
        <>
            <Row>
                <Col>
                <h1>Registration Page</h1>
                <p>Click <Link href={'/login'}>here</Link> if you already have an account</p>
                </Col>
            </Row>

            <Row>
                <Col>
                    <form onSubmit={handleSubmit(onSubmitForm)}>
                        <Row>
                            <Col>
                                <Controller 
                                name="email"
                                control={control}
                                render={({field}) => 
                                    <Input id="email" placeholder="Email"></Input>
                                }
                                ></Controller>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Controller 
                                name="username"
                                control={control}
                                render={({field}) => 
                                    <Input id="username" placeholder="Username"></Input>
                                }
                                ></Controller>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Controller 
                                name="password"
                                control={control}
                                render={({field}) => 
                                    <Input id="password" placeholder="Password"></Input>
                                }
                                ></Controller>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Controller 
                                name="birthdayDate"
                                control={control}
                                render={({field}) => 
                                    <DatePicker id="birthdayDate" placeholder="Birthday Date"></DatePicker>
                                }
                                ></Controller>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Controller 
                                name="address"
                                control={control}
                                render={({field}) => 
                                    <Input id="address" placeholder="Address"></Input>
                                }
                                ></Controller>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Controller 
                                name="gender"
                                control={control}
                                render={({field}) => 
                                    <Radio.Group>
                                        <Radio>Male</Radio>
                                        <Radio>Female</Radio>
                                        <Radio>Others</Radio>
                                    </Radio.Group>
                                }
                                ></Controller>
                            </Col>
                        </Row>
                        <Button htmlType="submit">Create Account</Button>
                    </form>
                </Col>
            </Row>
        </>
    )
}

