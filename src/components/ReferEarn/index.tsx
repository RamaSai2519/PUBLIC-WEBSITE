import React from 'react';
import { Button } from 'antd';
import { WhatsAppOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Box } from '@mui/material';
import { WhatsappShareButton, FacebookShareButton } from 'react-share';
import { Facebook } from '@mui/icons-material';
import { trackEvent } from '@/context/Amplitude/AmplitudeInit';
import Btn from '../button';

interface IReferAndShare {
    onShare?: () => void,
    url?: string
    message?: string
}
const ReferAndEarnCard = (props: IReferAndShare) => {
    const shareUrl = "https://www.sukoonunlimited.com/af/viba12";
    const message = "Check out this awesome opportunity!";

    return (
        <div className="bg-bgColor p-4 rounded-lg shadow-lg max-w-sm mx-auto">
            {/* Video or Image */}
            <Box className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/pecU_kh_qHw"
                    title="Referral Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </Box>

            {/* Card Content */}
            <h2 className="text-xl font-bold text-black mb-2">Refer & Earn</h2>
            <p className="text-base text-gray-700 mb-4">
                Share this opportunity with your friends and earn rewards!
            </p>

            {/* Share Buttons */}
            <div className="flex flex-col gap-2 space-x-4 justify-center mb-4 p-2 ml-2 mr-2 w-full">
                <WhatsappShareButton url={props.url || shareUrl} title={props.message || message} separator=":: " onClick={()=> {
                    trackEvent('whatsApp-share_clicked')
                }}>
                    <Btn text='Share on WhatsApp' key={'whatsApp'} color="primaryYellow" />
                      
                </WhatsappShareButton>


            </div>

        </div>
    );
};

export default ReferAndEarnCard;
