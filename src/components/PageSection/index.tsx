import React, { useRef, useState, useEffect } from 'react';
import Head from 'next/head';
import Image from "next/legacy/image";
import FullScreenModal from '../FullScreenModal';
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import appTheme from '@/theme';
import { useTrackEvent } from '@/context/Amplitude/Amplitude.hooks';
import { trackEvent } from '@/context/Amplitude/AmplitudeInit';
import ScrollArrow from '../ScrollArrow/ScrollArrow';

interface SectionProps {
    title: string;
    description: string;
    backgroundImage?: string | null;
    backgroundVideo?: string | null;
    textColor: string;
    heroText: string;
    isButton?:boolean;
    subText: string;
    ctaText: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: number;
    ctaBackgroundColor: string;
    modalTitle: string;
    modalButtonText: string;
    modalContent: React.ReactNode;
    topText?: String;
}

const PageSection: React.FC<SectionProps> = ({
    title,
    description,
    backgroundImage,
    backgroundVideo,
    textColor,
    heroText,
    subText,
    ctaText,
    fontSize,
    fontFamily,
    fontWeight,
    ctaBackgroundColor,
    isButton=false,
    modalTitle,
    modalButtonText,
    modalContent,
    topText
}) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(true);
    const [isVideo, setIsVideo] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMuteToggle = () => {

        setIsMuted(prevState => {
            trackEvent('testimonial-video', { mute: !prevState });
            return !prevState
        });
    };



    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVideo(true)
                        trackEvent('testimonial-video', { mute: isMuted, videoPlayed: true });
                        videoElement.play();
                    } else {
                        setIsVideo(false)
                        videoElement.pause();
                    }
                },
                { threshold: 0.5 }
            );

            observer.observe(videoElement);

            return () => {
                if (videoElement) {
                    observer.unobserve(videoElement);
                }
            };
        }
    }, []);

    return (
        <>
            <section
                className="relative h-full flex items-center justify- overflow-hidden"
                style={{ color: textColor, fontFamily, fontWeight }}
            >
                {/* Background Video */}
                {backgroundVideo && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        onEnded={() => trackEvent('testimonial-video', { mute: isMuted, videoPlayed: true, isVideoFinshed: true })}

                        className="absolute inset-0 object-cover w-full h-full"
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {/* Background Image */}
                {backgroundImage && !backgroundVideo && (
                    <div className="absolute inset-0 overflow-hidden transition-opacity duration-1000 ease-in-out">
                        <Image
                            src={backgroundImage}
                            alt="Background"
                            layout="fill"
                            className='bg-black'

                            objectFit="cover"
                            quality={100}
                            priority
                        />
                    </div>
                )}

                {/* Gradient Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent opacity-50"></div> */}

                {/* Content */}
                {isContentVisible && (
                    <div className=" relative z-10 flex flex-col items-center justify-end h-full w-full text-center px-4">

                        {backgroundImage && <div className="flex flex-col justify-center flex-grow gap-8">
                            {/* Add a subtle background overlay behind the text for better readability */}
                            <div className="relative z-10 p-4 shadow-lg bg-black bg-opacity-70 rounded-lg">
                                <h1 className={`text-${fontSize} font-bold text-primaryYellow `} dangerouslySetInnerHTML={{ __html: `${topText || ''}` }} />
                                <h2 className={`text-xl font-normalFont text-white `} dangerouslySetInnerHTML={{ __html: heroText }}>

                                </h2>
                                <p className="mt-4  text-white  font-normalFont" dangerouslySetInnerHTML={{ __html: subText }} />
                            </div>

                            <button

                                className="px-6 self-center py-3 animate-bounceIn rounded-full shadow-lg border-white border-[0.3px] w-fit text-black font-normalFont"
                                style={{
                                    backgroundColor: appTheme.colors.primaryYellow,
                                }}
                                onClick={() => setShowModal(true)}
                                dangerouslySetInnerHTML={{ __html: modalButtonText }}
                            />

                        </div>}
                        {/* CTA Button at the Bottom */}
                        {backgroundVideo && <div className="absolute bottom-0 w-full text-center  pb-16 px-4  p-8 rounded-t-3xl shadow-2xl">
                            <div className="flex flex-col justify-center flex-grow">
                                <h1 className={`text-2xl font-bold text-black`}>{heroText}</h1>
                                <p className="mt-4 text-black">{subText}</p>

                                <div className='flex w-full items-center justify-center'>
                                   {isButton ? <button
                                        className="px-6 py-3 w-fit animate-bounceIn rounded-full shadow-lg border-white border-[0.3px] text-black font-normalFont"
                                        style={{
                                            backgroundColor: appTheme.colors.primaryYellow,
                                        }}
                                        onClick={() => setShowModal(true)}
                                        dangerouslySetInnerHTML={{ __html: modalButtonText }}
                                    /> :  <div> 
                                        <span dangerouslySetInnerHTML={{ __html: modalButtonText }} />
                                        <ScrollArrow />
                                    </div>}
                                </div>

                            </div>

                        </div>}

                        {/* Mute/Unmute Button */}
                        {isVideo ? (
                            <button
                                onClick={handleMuteToggle}
                                className="absolute top-1/4 right-4 p-2  rounded-full shadow-lg"
                                style={{ color: textColor }}
                            >
                                {isMuted ? (
                                    <VolumeOff />
                                ) : (
                                    <VolumeUp />
                                )}
                            </button>
                        ) : <></>}

                        {/* Full Screen Modal */}
                        <div className="absolute bottom-8 w-full text-center px-4">
                            <FullScreenModal
                                title={modalTitle}
                                isVisible={showModal}
                                closeModal={() => {
                                    setShowModal(false)
                                    trackEvent('full-screen-modal', { open: showModal, title: title })
                                }}
                                position={isVideo ? "bottom-center-video" : 'bottom-center'}
                                buttonText={modalButtonText}
                            >{modalContent}</FullScreenModal>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default PageSection;
