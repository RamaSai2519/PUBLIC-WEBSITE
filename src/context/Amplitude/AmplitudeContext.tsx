'use client'; // Enable Client Components in Next.js 14

import { createContext, useContext, useEffect, ReactNode } from 'react';
import amplitude from '@amplitude/analytics-browser';

// Define the context types
interface AmplitudeContextType {
    trackEvent: (eventName: string, eventProperties?: Record<string, any>) => void;
    setUserId: (userId: string) => void;
    setUserProperties: (userProperties: Record<string, any>) => void;
    logRevenue: (productId: string, price: number, quantity?: number) => void;
}

// Create the context with an undefined initial value
const AmplitudeContext = createContext<AmplitudeContextType | undefined>(undefined);

// Define the provider component's props
interface AmplitudeProviderProps {
    children: ReactNode;
}

// AmplitudeProvider Component
export const AmplitudeProvider = ({ children }: AmplitudeProviderProps) => {
    useEffect(() => {
        amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY as string);
    }, []);

    const trackEvent = (eventName: string, eventProperties: Record<string, any> = {}) => {
        amplitude.track(eventName, eventProperties);
    };

    const setUserId = (userId: string) => {
        amplitude.setUserId(userId);
    };

    const setUserProperties = (userProperties: Record<string, any>) => {
        amplitude.add(userProperties);
    };

    const logAmEvent = (eventName: string, eventObj: any, eventType: "REGISTERED" | "NON_REGISTERD") => {
        amplitude.logEvent(eventName, eventObj)
    }
    const logRevenue = (productId: string, price: number, quantity: number = 1) => {
        const revenue = new amplitude.Revenue()
            .setProductId(productId)
            .setPrice(price)
            .setQuantity(quantity);
        //@ts-ignore
        amplitude.logRevenueV2(revenue);
    };

    return (
        <AmplitudeContext.Provider value={{ trackEvent, setUserId, setUserProperties, logRevenue }}>
            {children}
        </AmplitudeContext.Provider>
    );
};

// Custom hook to use the Amplitude context
export const useAmplitude = (): AmplitudeContextType => {
    const context = useContext(AmplitudeContext);
    if (!context) {
        throw new Error('useAmplitude must be used within an AmplitudeProvider');
    }
    return context;
};
