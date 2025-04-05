import { FC, useState, useEffect, useRef } from 'react';

interface BottomSheetProps {
    isOpen: boolean | string;
    onClose: () => void;
    children: React.ReactNode;
}

const BottomSheet: FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
    const sheetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    return (
        <div className={`fixed inset-0 z-[9999] ${isOpen ? 'block' : 'hidden'}`}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

            {/* Bottom Sheet */}
            <div
                ref={sheetRef}
                className={`fixed inset-x-0 bottom-0  bg-white  p-4 rounded-t-lg shadow-lg transition-transform duration-300 ${
                    isOpen ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default BottomSheet;
