import React, { useEffect, useRef } from 'react';
import { Modal } from 'antd';
import Lottie from 'lottie-web';
import { AnimatePresence, motion } from 'framer-motion';

interface CelebrateModalProps {
    visible: boolean;
    onClose: () => void;
    message?: string;
    lottieJson: object;
}

const CelebrateModal: React.FC<CelebrateModalProps> = ({ visible, onClose, message, lottieJson }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const animation = Lottie.loadAnimation({
                container: containerRef.current,
                animationData: lottieJson,
                loop: false,
                autoplay: true,
            });

            return () => animation.destroy();
        }
    }, [lottieJson]);

    return (
        <AnimatePresence>
            {visible && (
                <Modal
                    visible={visible}
                    onCancel={onClose}
                    footer={null}
                    centered
                    className="p-0 sm:top-10 sm:max-w-sm w-full"
                    bodyStyle={{ padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <div
                        className="relative flex flex-col items-center justify-center w-full"
                    >
                        {message && (
                            <div className="mt-4 text-center">
                                <span className="text-black text-xl font-bold text-shadow-md rounded-lg p-2">
                                    {message}
                                </span>
                            </div>
                        )}
                        <div ref={containerRef} className="w-full h-64" />
                        <button
                            onClick={onClose}
                            className="absolute top-1 right-1 text-black rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
                        >
                            &times;
                        </button>
                    </div>
                </Modal>
            )}
        </AnimatePresence>
    );
};

export default CelebrateModal;
