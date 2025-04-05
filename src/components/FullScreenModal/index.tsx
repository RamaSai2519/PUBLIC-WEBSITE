import React, { useState } from 'react';
import { Drawer, Form, Input, Select } from 'antd';
import 'antd/dist/reset.css';
import Btn from '../button';
import { ArrowBackIos } from '@mui/icons-material';
import BottomSheet from '../bottomsheet';
import { createEventByUserId } from '@/utils/axiosHelper';
import { useAppDispatch } from '@/store/hooks';
import { setLoading } from '@/store/slices/loadingSlice';
import LoadingComponent from '../loadingComponent/LoadingComponent';

interface FullScreenModalProps {
    title: string;
    buttonText: string;
    children: React.ReactNode;
    closeModal?: () => any;
    isVisible?: boolean;
    position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | "bottom-center" | "bottom-center-video"; // Optional position prop
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ title, buttonText, children, position = 'center', isVisible, closeModal }) => {
    const positionStyles: { [key: string]: React.CSSProperties } = {
        center: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        'top-left': {
            position: 'absolute',

        },
        'top-right': {
            position: 'absolute',

        },
        'bottom-left': {
            position: 'absolute',

        },
        'bottom-right': {
            position: 'absolute',

        },
        'bottom-center': {
            position: 'relative',


        },
        'bottom-center-video': {
            position: 'relative',


        },
    };

    const [successMessage, setSuccessMessage] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('Please enter a valid phone number.');
    const [isRegister, setIsRegister] = useState(false);
    const dispatcher = useAppDispatch();
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
        if (e.target.value.length < 10) {
            setPhoneError('Please enter a valid phone number.');
        } else {
            setPhoneError('');
        }
    };
    const { Option } = Select;

    const registerUser = async (e: any) => {
        dispatcher(setLoading(true))
        createEventByUserId({
            eventName: "new_mobile_website",
            slug: 'new_mobile_website',
            token: "",
            phoneNumber: e.phoneNumber,

        }).catch(e => {
            dispatcher(setLoading(false))
        }).then(e => {
            // console.log(e,"qwert")
            //@ts-ignore
            if (e?.output_status === "SUCCESS") {
                dispatcher(setLoading(false))
                setSuccessMessage("Thankyou!! You will recieve a callback in 15 minutes from us!!")
            } else {
                dispatcher(setLoading(false))
                setSuccessMessage("Something went wrong !!")
            }
        });
    }



    const SucessMessageComponent = () => {
        return <div className='flex flex-col gap-4'>


            <p className='text-center text-xl'>{successMessage}</p>
        </div>
    }
    return (
        <div style={positionStyles[position]}>
            <Drawer
                placement='left'
                open={isVisible}
                onClose={closeModal}
                footer={null}
                closable={false}
                width="100vw"
                destroyOnClose={true}
                closeIcon={<></>}
            >
                <LoadingComponent />
                {/* Header Section */}
                <div className="top-0 left-0 fixed  z-50 w-screen flex flex-row border  items-center justify-around  shadow-sm p-1">
                    <p className="ml-1 text-lg font-normalFont self-center items-center pt-4">
                        <ArrowBackIos
                            fontSize="small"
                            className="cursor-pointer"
                            onClick={closeModal}
                        />{title}</p>

                    <Btn
                        text={"Join Sukoon Community Now"}
                        fontSize={'text-lg'}
                        color='blue'
                        onClick={() => setIsRegister(true)}
                    />
                </div>

                {/* Modal Content */}
                <div className="p-4 mt-10">
                    {children}

                </div>

                <BottomSheet isOpen={isRegister} onClose={() => setIsRegister(false)} ><>
                    <div className='flex flex-col gap-4'>
                        <h1 className='text-xl mb-2'>{successMessage ? "" : "We’re here for you. Lets's talk"}</h1>

                        {successMessage ? <SucessMessageComponent /> : <Form name='capture-phonenumber-lead' onFinish={registerUser}>
                            <Form.Item name={'phoneNumber'} rules={[{
                                min: 10,
                                message: "Please check phone number"
                            }, { required: true, message: "Please enter phone number" }]}>
                                <Input
                                    type="tel"
                                    className='font-normalFont '
                                    placeholder="Enter your 10 digit Phone number"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    maxLength={15}
                                    autoComplete="tel"
                                />

                                {/* {phoneError && <span className="text-red-500">{phoneError}</span>} */}
                            </Form.Item>

                            <Btn text='Speak Now' color='primaryYellow' isFullWidth isDisabled={phoneError.length === 0 ? false : true} />

                        </Form>}
                    </div>
                </>
                </BottomSheet>

            </Drawer>
        </div>
    );
};

export default FullScreenModal;
