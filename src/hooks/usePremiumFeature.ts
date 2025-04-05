// src/hooks/usePremiumFeature.ts
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { RootState } from '.'; // Adjust the import path based on your store configuration
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { Data } from '@/store/slices/userInfoAuthSlice';
import { useAppDispatch } from '@/store/hooks';
import { enableLoginModal } from '@/store/slices/loginModalSlice';

const usePremiumFeature = () => {
    
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userDetails = useAppSelector((state: any) => state.authUserReducer.data);
    const isPaid = userDetails?.paid;
    // const isPaid = userDetails?.isPaidUser;
    const isLoggedIn = !!userDetails?._id;  // Check if the user is logged in
    const [isOpen, setIsOpen] = useState(false);

    const openPremiumFeature = () => {
      
        if (!isLoggedIn) {
            dispatch(enableLoginModal({
                showLoginModal: true,
                isPaid: true,
               modalHeading:"Hello!",
               modalSubHeading:"",
               modalDescription:"This feature is exclusively available for Club Sukoon members. Become a member now"
            }));
        } else if (!isPaid) {
        
            setIsOpen(true);
        }
    };

    const closePremiumFeature = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isPaid) {
            console
            setIsOpen(false);
        } 
    }, [isPaid]);

    return {
        isPaid,
        isLoggedIn,
        isOpen,
        openPremiumFeature,
        closePremiumFeature,
    };
};

export default usePremiumFeature;
