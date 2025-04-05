import { useAppDispatch } from '@/store/hooks';
import { disableLoginModal } from '@/store/slices/loginModalSlice';
import { useAppSelector } from '@/store/store';
import Image from "next/legacy/image";
import React, { useMemo } from 'react';

const LoadingComponent: React.FC = (() => {
    const isLoading = useAppSelector((state) => state.loadingReducer.isLoading);
    const dispatch = useAppDispatch();

    const memoizedDispatch = useMemo(() => dispatch, [dispatch]);

  

    return isLoading ? (
        <div className="fixed top-0 left-0 z-[999] w-full h-full flex justify-center items-center bg-black bg-opacity-30">
            <div className="loading-spinner">
                <Image className='bg-primaryYellow rounded-full' src="/loading.svg" alt="sukoon unlimited  loading icon" width={100} height={100} />
            </div>
        </div>
    ) : null;
});

export default LoadingComponent;
