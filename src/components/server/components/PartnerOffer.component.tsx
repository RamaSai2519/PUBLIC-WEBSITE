import Btn from '@/components/button';
import { WhatsApp } from '@mui/icons-material';
import React from 'react';

interface PartnerOffersProps {
  title: string;
  subtitle: string;
  description: string;
  termsLink: string;
  imageSrc: string;
  onDownloadAppClick?: () => void;
  onChatNowClick?: () => void;
}

const PartnerOffers: React.FC<PartnerOffersProps> = ({
  title,
  subtitle,
  description,
  termsLink,
  imageSrc,
  onDownloadAppClick,
  onChatNowClick,
}) => {
  return (
    <div className="bg-purple-100 p-6 rounded-lg shadow-md flex flex-col lg:flex-row items-center gap-6 lg:gap-10 w-full border-4 border-purple-200">
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-xl lg:text-4xl font-extrabold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-base lg:text-base text-gray-700 mb-4">{description}</p>
        <a
          href={termsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-purple-600 underline mb-4 inline-block"
        >
          Terms & Conditions
        </a>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
         
          <Btn text='Download App' color='black' textColor='white' border='black' borderType='rounded' onClick={onDownloadAppClick} />
           <Btn text="Chat Now" textColor="black" border='black' endIcon={<WhatsApp fontSize='small' />} borderType='rounded' color='transparent'  />
            
          
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-shrink-0">
        <img
          src={imageSrc}
          alt="Partner Offer"
          className="w-full lg:w-64 rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default PartnerOffers;
