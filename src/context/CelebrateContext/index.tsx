import React, { createContext, useContext, useState, ReactNode } from 'react';
import CelebrateModal from '@/components/CelebrateModal';


interface CelebrateModalContextType {
    showCelebrateModal: (message: string, lottieJson: object) => void;
}

const CelebrateModalContext = createContext<CelebrateModalContextType | undefined>(undefined);

export const CelebrateModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState<string | undefined>(undefined);
    const [lottieJson, setLottieJson] = useState<object | undefined>(undefined);

    const showCelebrateModal = (msg: string, json: object) => {
        setMessage(msg);
        setLottieJson(json);
        setVisible(true);
        setTimeout(() => setVisible(false), 3500); // Close after 2 seconds
    };

    return (
        <CelebrateModalContext.Provider value={{ showCelebrateModal }}>
            {children}
            {visible && (
                <CelebrateModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    message={message}
                    lottieJson={lottieJson!}
                />
            )}
        </CelebrateModalContext.Provider>
    );
};

export const useCelebrateModal = () => {
    const context = useContext(CelebrateModalContext);
    if (context === undefined) {
        throw new Error('useCelebrateModal must be used within a CelebrateModalProvider');
    }
    return context;
};
