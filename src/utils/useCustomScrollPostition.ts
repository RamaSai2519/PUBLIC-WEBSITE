import { useState, useEffect } from 'react';

interface ScrollPosition {
    isScrolled: boolean;
    scrolledHero: boolean;
}

const useCustomScrollPosition = (height: string | number): ScrollPosition => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [scrolledHero, setScrolledHero] = useState<boolean>(false);

    const parseHeight = (height: string | number): number => {
        if (typeof height === 'string') {
            if (height.endsWith('vh')) {
                return (window.innerHeight * parseInt(height)) / 100;
            } else if (height.endsWith('px')) {
                return parseInt(height);
            }
        }
        return typeof height === 'number' ? height : parseInt(height);
    };

    useEffect(() => {
        const handleScroll = () => {
            const parsedHeight = parseHeight(height);
            setIsScrolled(window.scrollY >= parsedHeight);
            setScrolledHero(window.scrollY >= window.innerHeight);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [height]);

    return { isScrolled, scrolledHero };
};

export default useCustomScrollPosition;
