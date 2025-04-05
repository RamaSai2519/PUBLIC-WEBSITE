'use client';
import { Metadata } from 'next';
import React, { useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from '@mui/material';
import DateOfBirthInput from '../DateOfBirthInput';
import axios from 'axios';
import Btn from '../button';
import { ArrowForwardIos } from '@mui/icons-material';
import { createEventByExternal, createUserByExternal } from '@/utils/axiosHelper';
import { trackEvent } from '@/context/Amplitude/AmplitudeInit';
import { sendGAEvent } from '@next/third-parties/google';
import ReactGA from 'react-ga4';
import { isAfter, isBefore, isValid } from 'date-fns';
export const metadata: Metadata = {
  title: 'Register',
  description: 'Registration Form for Seniors',
};

interface UserFormInterface {
  refSource?: string;
  isUnderFifty?: boolean;
  type?: 'event' | 'external';
}
const RegisterPage = (props:UserFormInterface) => {
  console.log('props', props.refSource);
  const [userForm, setUserForm] = React.useState({
    userName: '',
    userPhone: '',
    userCity: '',
    birthDate: '' ,
  });

  const [city, setCity] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [error, setError] = React.useState('');

  useEffect(()=>{
    if(isModalOpen === true) {
      trackEvent('register_success_event_form', { phone: userForm.userPhone });
    }
  },[isModalOpen])
  const fetchCities = async (city: string) => {
    try {
      const response = await axios.get(
        `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=6sc6mb971PBu3RvKqCRaW68OPlIKhweMoMwuwgl2K5tKPmhVOUYZJQQJ99BAACYeBjFmb2XaAAAgAZMP3XhO&query=${city.toLowerCase()}&countrySet=IND`
      );
      setCity(response.data?.results);
    } catch (err) {
      console.error('Error fetching cities:', err);
    }
  };

  const [isFormDetailValid, setFormDetailValid] = React.useState({
    isValidName: false,
    isValidPhone: false,
    isValidCity: false,
    isValidDate: false,
  });

  const handleRegister = async () => {
    if(isAfter(userForm.birthDate, '01-01-1975')  && isValid(userForm.birthDate) && !props.isUnderFifty) {
      alert('Age should be greater than 50 years');
      return;
    }
    trackEvent('register_clicked', { phone: userForm.userPhone });  
    let response:any  = {};
    if(props.type === 'event') {
      trackEvent('register_event_form', {
        phone: userForm.userPhone,
        refsource: props.refSource,
      });
      response = await createEventByExternal({
        name: userForm.userName,
        phoneNumber: userForm.userPhone,
        slug: props.refSource || 'deme',
        city: userForm.userCity,
        mainTitle: 'Senior Registration',
        dob: userForm.birthDate,
      });
    }
     else {
      let refSource = `external_${props.refSource}`;
      trackEvent('register_event_form', {
        phone: userForm.userPhone,
        refsource: refSource,
      });
      response = await createUserByExternal({
        name: userForm.userName,
        phoneNumber: userForm.userPhone,
        refSource: 'zappy',
        city: userForm.userCity,
        mainTitle: 'Senior Registration',
        birthDate: userForm.birthDate,
      });      
     }

    if (response.success) {
      setIsModalOpen(true);
      setError('');
    } else {
      setError(response.message || 'Registration failed. Please try again.');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const isAndroid = /android/i.test(navigator.userAgent);
  return (
    <div
      id="register-form"
      className="form-container  bg-white   max-w-md mx-auto mt-10  mb-10 border-black rounded-lg border-2 border-l-0 border-t-0 p-3"
    >
      <h1 className="text-lg font-bold">Register now!</h1>
      <p className="text-gray-500 mb-4">Making You Feel Better Everyday</p>
      <div className="flex flex-col gap-2 p-2">
        <div className="rounded-lg border-black">
          <TextField
            id="phone"
            fullWidth
            label="Phone"
            prefix="+91"
            placeholder="Please enter your phone number"
            variant="outlined"
            inputMode="tel"
            onChange={(e) => {
              if (e.target.value.length >= 10) {
                setFormDetailValid({
                  ...isFormDetailValid,
                  isValidPhone: true,
                });
                //@ts-ignore
                trackEvent('phone_entered', {
                  phone: e.target.value,
                  isValid: true,
                });
                setUserForm({ ...userForm, userPhone: e.target.value });
              } else {
                setFormDetailValid({
                  ...isFormDetailValid,
                  isValidPhone: false,
                });
              }
            }}
          />
        </div>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          placeholder="Please enter your name"
          inputMode="text"
          onChange={(e) => {
            trackEvent('inputButtonClicked', { name: e.target.value });
            if (e.target.value.length > 3) {
              setFormDetailValid({
                ...isFormDetailValid,
                isValidName: true,
              });
            }
            setUserForm({ ...userForm, userName: e.target.value });
          }}
        />
        {!props.isUnderFifty === true && <Typography variant="body2" className="text-sm font-bold text-red-400">
          Date of Birth (Age should be greater then 50 years)
        </Typography>}
        <DateOfBirthInput

          onChange={(e: any) => {
            if (
              isBefore(e?.dob, '01-01-1975') &&
              isAfter(e?.dob, '01-01-1920') &&
              isValid(e?.dob)
            ) {
              setFormDetailValid({
                ...isFormDetailValid,
                isValidDate: true,
              });
              //@ts-ignore
              trackEvent('dob_entered', {
                dob: e.dob,
                isAboveFiftyYears: true,
              });
              //@ts-ignore
            } else if (isAfter(e?.dob, '01-01-1975') && isValid(e?.dob)) {
              setFormDetailValid({
                ...isFormDetailValid,
                isValidDate: false,
              });
              //@ts-ignore
              trackEvent('dob_entered', {
                dob: e.dob,
                isAboveFiftyYears: false,
              });
            }
            //@ts-ignore
            setUserForm({ ...userForm, birthDate: e.dob ? e.dob : '' });
          }}
        />
        <Autocomplete
          id="city"
          autoComplete={false}
          aria-placeholder="Please search your city"
          onFocus={() => fetchCities('Bengaluru')}
          onInputChange={(e, value) => {
            setFormDetailValid({
              ...isFormDetailValid,
              isValidCity: true,
            });
            trackEvent('city_entered', { city: value });
            setUserForm({ ...userForm, userCity: value });
          }}
          onInput={(e) =>
            //@ts-ignore
            e?.target?.value.length % 3 === 0
              ? //@ts-ignore
                fetchCities(e?.target?.value)
              : null
          }
          //@ts-ignore
          options={city.map((option) => option.address.freeformAddress)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="City"
              placeholder="Please search your Address"
              variant="outlined"
            />
          )}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Btn
          text="Register"
          isDisabled={
            !isFormDetailValid.isValidCity &&
            !isFormDetailValid.isValidDate &&
            !isFormDetailValid.isValidName &&
            !isFormDetailValid.isValidPhone
          }
          color="primaryYellow"
          onClick={handleRegister}
        />
      </div>

      {/* Modal using MUI */}
      <Dialog open={isModalOpen} onClose={closeModal} maxWidth="sm" fullWidth>
        <div className="border-t-2 border-l-2 border-b-4 border-r-4 rounded-md border-black">
          <DialogTitle>
            <div className="flex justify-between items-center">
              <Button
                onClick={closeModal}
                style={{
                  minWidth: 'auto',
                  color: '#000',
                  fontWeight: 'lighter',
                  textTransform: 'none',
                }}
              >
                X
              </Button>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className="text-center">
              <img
                src="https://sukoon-media.s3.ap-south-1.amazonaws.com/success.png"
                alt="Celebration"
                className="w-12 h-12 mx-auto mb-4"
              />
              <p className="text-lg font-bold mb-4">You're all set!</p>
              <p className="text-sm text-black mb-4">
                We have sent the event details to your WhatsApp so you can get
                ready to join us.
              </p>
              <p className="text-sm text-black mb-4">
                Want to explore more events? You can easily choose your
                favorites right here on the website or download our app for even
                more fun and convenience!
              </p>
              <p className="text-sm text-black mb-4">
                We can’t wait to see you at the event! 😊
              </p>
            </div>
          </DialogContent>
          <div className="flex justify-center items-center mb-8">
            <Btn
              text={isAndroid ? 'Download App' : 'Close'}
              endIcon={<ArrowForwardIos fontSize="inherit" />}
              color="primaryYellow"
              onClick={() => {
                closeModal();
                if (isAndroid) {
                  window.open(
                    'https://play.google.com/store/apps/details?id=com.sukoon.india&hl=en'
                  );
                } else {
                  window.location.reload();
                }
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RegisterPage;
