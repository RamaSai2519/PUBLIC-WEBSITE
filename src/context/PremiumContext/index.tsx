//@ts-nocheck
import React, { createContext, useContext, useState, ReactNode, ReactElement } from 'react';
import usePremiumFeature from '@/hooks/usePremiumFeature'; // Ensure this hook is correctly implemented
import PremiumPop from '@/components/premiumPop';

interface PremiumContextType {
    isOpen: boolean;
    openPremiumFeature: () => void;
    closePremiumFeature: () => void;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }): ReactElement => {
    const { isOpen, openPremiumFeature, closePremiumFeature } = usePremiumFeature();


    return (
        <PremiumContext.Provider key={'aaa'} value={{ isOpen, openPremiumFeature, closePremiumFeature }}>
            {children}
            {isOpen && <PremiumPop key={'aaa'} />}
        </PremiumContext.Provider>
    );
};

export const usePremium = (): PremiumContextType => {
    const context = useContext(PremiumContext);
    if (!context) {
        throw new Error('usePremium must be used within a PremiumProvider');
    }
    return context;
};
