import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';

const FloatingButton: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const hiddenPaths = ['/refferal']; // Update this array as needed
    const AppSelector = useAppSelector((state) => state.globalConfig)
    // Check if the button should be hidden
    const shouldHide = hiddenPaths.includes(pathname);
    if (shouldHide) return null;
    const handleClick = () => {
        router.push('/refferal');
    };

    return (
        AppSelector.hideShare === false && <div
            onClick={handleClick}
            className="fixed bottom-8 right-2 bg-yellow-400  border-yellow-500 border-2 text-black text-lg font-heavyFont py-3 px-6 rounded-full shadow-lg cursor-pointer z-50 hover:bg-yellow-300 transition-colors"
        >
            Refer & Earn
        </div>
    );
};

export default FloatingButton;
