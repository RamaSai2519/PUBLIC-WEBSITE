import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Btn from '../button';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import RegisterPage from '@/components/server/registerForm.server';
import { ArrowForwardIos, AutorenewOutlined, WhatsApp } from '@mui/icons-material';
import { Modal } from 'antd';
import { handleWaClick } from '../whatsAppLink/WhatsAppLink';

interface HeroZappyProps {
  header: string;
  subHeader: string;
  refSource?: string;
  communityText?: string;
  whatsAppMessageText?: string;
  communityHighlight?: string;
  communitySuffix?: string;
  chatButton?: string;
  registerButton?: string;
  heroImageUrl?: string;
  isUnderFifty?: boolean;
  type: 'event' | 'external'; // external is Partner & evnet is Event
}

const HeroZappy: React.FC<HeroZappyProps> = (props: HeroZappyProps) => {
  let {
    header = 'Welcome to Sukoon',
    subHeader = 'Join a community of care and companionship',
    communityText = 'Sukoon is a community of ',
    communityHighlight = '5000+',
    isUnderFifty = false,
    whatsAppMessageText = 'Would like to know more about Sukoon',
    communitySuffix = ' happy senior citizens',
    chatButton = 'Chat with us',
    registerButton = 'Register now',
    refSource = 'none',
    heroImageUrl= 'https://sukoon-media.s3.ap-south-1.amazonaws.com/healtysure_logo.png',
    type = 'external',
  } = props;
  const [open, setOpen] = useState(false);

  const ActionButton = ({ isBackgroud = false }) => {
    let regularClass = `mt-6 flex items-center gap-2 p-4 rounded-lg`;
    let noClass = `flex flex-row ${
      isBackgroud ? 'justify-center' : ''
    } items-center gap-2 pt-6 pb-6 w-full`;
    return (
      <div className={noClass}>
        <Btn
          text={chatButton}
          onClick={() => handleWaClick('', whatsAppMessageText)}
          borderType="rounded"
          endIcon={<WhatsApp />}
        />

        {/* Open MUI Dialog on Click */}
        <Btn
          onClick={() => setOpen(true)}
          text={registerButton}
          color="primaryYellow"
          endIcon={<ArrowForwardIos />}
        />
      </div>
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-pink-50 to-white pt-6 md:pt-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start space-y-6">
          {/* Community stats */}
            <div className="hidden md:block relative rounded-2xl bg-pink-100/80 px-6 py-3 shadow-md ml-2">
            <p className="text-sm font-medium text-gray-800 md:text-base">
              {communityText}
              <span className="font-semibold text-purple-600">
              {communityHighlight}
              </span>
              {communitySuffix}
            </p>
            <div className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 bg-pink-100/80"></div>
            </div>

          {/* Main content */}

          {/* Sukoon Logo */}
          <div className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-16">
            {/* Text Content */}
            <div className="relative z-10 text-center md:text-left max-w-2xl md:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                {header || header}
              </h1>
              <p className="mt-4 text-xl font-medium text-amber-500 md:text-2xl">
                {subHeader || subHeader}
              </p>
              <div className="hidden md:block mt-6">
                <ActionButton />
              </div>
            </div>

            {/* Image with Blur Background */}
            <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="absolute inset-0 bg-purple-300 blur-3xl opacity-50 -z-10" />
              <Image
                src={heroImageUrl}
                alt={props.header}
                width={450}
                height={450}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex fixed bottom-0 z-10 w-full md:hidden items-center justify-center 
                bg-gradient-to-r from-lightYello to-yellow-100 
                rounded-t-2xl shadow-2xl shadow-black/50 backdrop-blur-md pl-2 pr-2"
      >
        <ActionButton isBackgroud />
      </div>

      {/* MUI Dialog */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        animation={true}
        centered
        closable
        okButtonProps={{ style: { display: 'none' } }}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <RegisterPage isUnderFifty={isUnderFifty} refSource={refSource} type={type} />
      </Modal>
    </section>
  );
};

export default HeroZappy;
