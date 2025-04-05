// hooks/useAmplitude.ts  
import { useEffect } from 'react';
import { initializeAmplitude, setAmplitudeUserId, setAmplitudeUserProperties, trackEvent } from '../Amplitude/AmplitudeInit';
import { sendGAEvent } from '@next/third-parties/google';

export const useAmplitude = (apiKey: string) => {
    useEffect(() => {
        initializeAmplitude(apiKey);
    }, [apiKey]);
};

export const useTrackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
    useEffect(() => {
        if (eventName) {
            sendGAEvent(eventName, eventProperties || {});
            trackEvent(eventName, eventProperties);
        }
    }, [eventName, eventProperties]);
};

export const useUserProperties = (userId: string, properties: Record<string, any>) => {
    useEffect(() => {
        if (userId) {
            setAmplitudeUserId(userId);
        }
        if (properties) {
            setAmplitudeUserProperties(properties);
        }
    }, [userId, properties]);
};  
