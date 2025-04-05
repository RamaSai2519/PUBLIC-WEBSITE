// lib/amplitude.ts  
'use client'
import { init, setUserId, Identify, track } from '@amplitude/analytics-browser';
import { sendGAEvent } from '@next/third-parties/google';
// import ReactGA from "react-ga";
import ReactGA from 'react-ga4';
export const initializeAmplitude = (apiKey: string) => {
    init(apiKey);
};

export const trackEvent = (eventName: string, eventProperties?: Record<string, any>) => {
    let _eventName = `WEB_${eventName}`;
     sendGAEvent(_eventName, eventProperties || {});
     ReactGA.event({
        category: 'Amplitude',
        action:_eventName,
        label: JSON.stringify(eventProperties),
     },_eventName)
     
    track(_eventName, eventProperties);
};

export const setAmplitudeUserId = (userId: string) => {
    setUserId(userId);
};

export const setAmplitudeUserProperties = (properties: Record<string, any>) => {
    const identify = new Identify();
    Object.keys(properties).forEach((key) => {
        identify.set(key, properties[key]);
    });
    try {
        if(typeof window != null ) window.amplitude.getInstance().identify(identify);
    } catch (error) {
        
    }
  
};  