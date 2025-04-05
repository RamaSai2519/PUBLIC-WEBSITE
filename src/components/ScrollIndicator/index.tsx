import React, { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Use an appropriate icon

const ScrollIndicator = () => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [showScrollIcon, setShowScrollIcon] = useState(true);

    useEffect(() => {
        // Check if the content is scrollable
        const checkScroll = () => {
            const scrollable = document.documentElement.scrollHeight > window.innerHeight;
            setIsScrollable(scrollable);
        };

        checkScroll(); // Check on initial load
        window.addEventListener('resize', checkScroll); // Re-check on window resize

        return () => {
            window.removeEventListener('resize', checkScroll); // Clean up event listener
        };
    }, []);

    useEffect(() => {
        if (isScrollable) {
            // Handle scroll event to toggle visibility of the scroll icon
            const handleScroll = () => {
                if (window.scrollY > 10) {
                    setShowScrollIcon(false);
                } else {
                    setShowScrollIcon(true);
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }
    }, [isScrollable]);

    return (
        <>
            {isScrollable && showScrollIcon && (
                <div className="scroll-indicator">
                <ExpandMoreIcon fontSize="large" />
            </div>
            )}
        </>
    );
};

export default ScrollIndicator;
