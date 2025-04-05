import React from 'react';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Link from 'next/link';
import { ArrowDownwardOutlined } from '@mui/icons-material';

const ScrollArrow: React.FC = () => {
    return (
        <div className="relative flex flex-col justify-between">
            {/* Your main content */}


            {/* Scroll Indicator */}
            <div className="flex justify-center ">
                <div
                   
                    
                   style={{marginTop: '10px'}}
                >
                    <ArrowDownwardOutlined className='text-gray-300' style={{ fontSize: 30 }} />
                </div>


            </div>
        </div>
    );
};

export default ScrollArrow;
