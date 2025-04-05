'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Btn from '../button';
import Icon, { CopyOutlined } from '@ant-design/icons';
import { message } from 'antd';
import Link from 'next/link';
import { OpenInNew } from '@mui/icons-material';
import { useAppSelector } from '@/store/store';

export interface OfferCardProps {
  _id?: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  discount: string;
  cardType?: 'large' | 'small';
  buttonText: string;
  couponCode: string;
  validTill?: string;
  offer_type?: 'partner' | 'code';
  actual_price?: number | string;
  discountPercentage?: number | string;
  finalPrice?: number | string;
  website?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({
  imageUrl,
  imageAlt,
  title,
  description,
  discount,
  buttonText,
  couponCode,
  cardType = 'large',
  website,
  offer_type,
}) => {
  const [copied, setCopied] = useState(false);

  const userDetails = useAppSelector((state) => state.authUserReducer.data);
  const handleCopyCouponCode = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000); // Reset "Copied" after 2 seconds
    });
  };

  // const handleGoToWebsite = () => {
  //   if (website) {
  //     window.location.href = website; // Navigate to the partner website
  //   }
  // };

  const LargeCardPartner = () => {
    return (
      <div className="relative flex flex-col w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-xs 2xl:max-w-xs shadow-lg rounded-lg border border-black border-t border-b-4 border-r-4 overflow-hidden">
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-40 flex justify-center items-center  ">
        <Image
          src={imageUrl}
          alt={imageAlt}
          layout="intrinsic"
          width={200}
          height={200}
          objectFit="contain"
          className="rounded-t-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5">
        <h3 className="text-[#33775A] text-lg sm:text-xl font-bold">{title}</h3>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          {description} <span className="text-[#FFC629] font-semibold">{discount}</span>
        </p>
      </div>

      {/* Fixed Bottom Button */}
      <div className="w-full p-4 bg-white border-t border-gray-200 flex flex-col items-center justify-center">
        {offer_type === 'partner' && website ? (
          <>
            <Link target="_blank" href={userDetails?.isPaidUser ? website : ''} className="w-full">
            {!userDetails?.isPaidUser && (
              <span className="mt-2 text-gray-500 text-sm text-center">
                Redemption is allowed only for Sukoon Members
              </span>
            )}
              <Btn
                isFullWidth
                color="primaryYellow"
                isDisabled={!userDetails?.isPaidUser}
              >
                {buttonText} <OpenInNew />
              </Btn>
            </Link>
            
          </>
        ) : (
          <button
            className="bg-gray-100 text-[#33775A] font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300 w-full border border-black border-t border-b-4 border-r-4 flex items-center justify-center gap-2"
            onClick={handleCopyCouponCode}
          >
            {copied ? (
              <span className="text-green-500">Copied!</span>
            ) : (
              <>
                <span>{couponCode}</span>
                <CopyOutlined />
              </>
            )}
          </button>
        )}
      </div>
    </div>
    );
  };

  const SmallerCardCoupon = () => {
    return (
      <div className="flex flex-row gap-2 items-center  w-[400px]  border-2 border-gray-300 rounded-lg p-2">
        <Image
          src={imageUrl}
          alt={imageAlt}
          className="object-center rounded-full w-16 h-16 p-2 bg-goldLight"
          width={64}
          objectFit="cover"
          height={64}
        />
        <div className="font-normalFont">{description}</div>
      </div>
    );
  };
  return cardType === 'large' ? <LargeCardPartner /> : <SmallerCardCoupon />;
};

export default OfferCard;
