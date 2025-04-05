import Axios from 'axios';
import ReactGA from 'react-ga4';
import { AWS_URL } from './axiosHelper';
import { browserName, isMobile } from 'react-device-detect';
import { v4 as uuid4 } from 'uuid'
export const initGA = () => {
    ReactGA.initialize('G-6FZ8Y7KBSS');
};



export interface AnalyticsData {
    sessionId?: string;
    userId?: string;
    refCode?: string;
    refLink?:string;
    isUserRegister?: boolean;
}
export const publishAnalytics = (props: AnalyticsData) => {

    let params = new URLSearchParams(props.refCode) ;
   
    try {
        //@ts-ignore
        params = params.get('utm_source')?.toString();
    } catch (error) {
       
    }
 
    if (params != null || params != '') {
        const payload = {
            sessionId: props.sessionId,
            device: browserName,
            deviceInfo: isMobile ? 'Mobile' : "Desktop",
            userId: props.userId || "",
            refCode: params || "",
            refLink: props.refLink || '',
            isUserRegister: props.isUserRegister || false,
        };
        Axios({
            baseURL: AWS_URL,
            url: "analytics/capture",
            method: "POST",
            data: payload

        })
    }
    


}

export const generateUUID = () => {
    let uuid = uuid4();
    try {
        let sessionId = sessionStorage.getItem('trackSessionId');
        if (sessionId) return sessionId;
        sessionStorage.setItem('trackSessionId', uuid)
    } catch (error) {
        sessionStorage.setItem('trackSessionId', uuid)
    }
    return uuid;

}