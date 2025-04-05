import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from "next/legacy/image";
import { VolumeOff, VolumeUp } from '@mui/icons-material';
import FullScreenModal from '../FullScreenModal';
import appTheme from '@/theme';

interface SectionProps {
    backgroundImage?: string | null;
    backgroundVideo?: string | null;
}

const words = ["Health", "Family", "Finance", "Legality"]; // Words to animate

const MobileAnimated: React.FC<SectionProps> = ({ backgroundImage, backgroundVideo }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track the current word index
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMuteToggle = () => setIsMuted(prevState => !prevState);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        videoElement.play();
                    } else {
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

    // Change the word every 2 seconds (or your preferred interval)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 4000); // Update word every 2 seconds
        return () => clearInterval(interval);
    }, []);

    // Framer Motion Variants for Animating Text
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <motion.section
                  style={{
                    position: 'relative',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth transition for page load
            >
                {/* Background Video */}
                {backgroundVideo && (
                    <video
                        ref={videoRef}
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        className="absolute inset-0 object-cover w-full h-full"
                    >
                        <source src={backgroundVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {/* Background Image */}
                {backgroundImage && !backgroundVideo && (
                    <div className="absolute inset-0">
                        <Image
                            src={backgroundImage}
                            alt="Background"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <div
                //@ts-ignore
                    className="relative z-10 text-center text-white px-4  bg-black rounded-xl shadow-lg"
                    
                >
                    {/* Only animate one word at a time */}
                    <div
                    //@ts-ignore
                    className='flex flex-row gap-2 self-center text-center items-center  pt-3 justify-center'>
                    <div
                    //@ts-ignore
                            className="text-2xl font-boldFont mb-8 uppercase"
                         
                        
                            
                        >
                           Worry about
                        </div>
                        <div
                        //@ts-ignore
                            className="text-2xl  mb-8 bg-yellow-300 rounded-lg  text-black  p-1 uppercase"
                            key={currentWordIndex} // Change the key to trigger re-animation
                           
                        >
                            {words[currentWordIndex]}?
                        </div>
                    </div>

                    {/* Input and CTA */}
                    <div
                        style={{ gap: '0.5rem' }}
                       
                    >
                        <input
                            type="text"
                            placeholder="Enter your number"
                            style={{
                                padding: '0.5rem 1rem',
                                color: 'black',
                                borderRadius: '0.5rem',
                                marginBottom: '1rem',
                                textAlign: 'center',
                                width: '100%'
                            }}
                        />
                        
                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '9999px',
                                color: 'black',
                                width: '100%',
                                backgroundColor: appTheme.colors.primaryYellow
                            }}
                            onClick={() => setShowModal(true)}
                        >
                            Start Now
                        </button>
                    </div>

                    {/* Mute/Unmute Button */}
                    {backgroundVideo && (
                        <motion.button
                     
                            onTap={handleMuteToggle}
                            style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.5rem', backgroundColor: 'white', color: 'black', borderRadius: '9999px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            {isMuted ? <VolumeOff /> : <VolumeUp />}
                        </motion.button>
                    )}
                </div>

                {/* Modal */}
                <FullScreenModal
                buttonText="Sign Up"
                    title="Sign Up"
                    isVisible={showModal}
                    closeModal={() => setShowModal(false)}
                >
                    <p>Modal content goes here...</p>
                </FullScreenModal>
            </motion.section>
        </>
    );
};

export default MobileAnimated;
