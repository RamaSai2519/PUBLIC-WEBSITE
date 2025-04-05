import { motion } from 'framer-motion';
import WhatsAppLink from '../whatsAppLink/WhatsAppLink';

interface iProps {
    isVisible: boolean,
    customKey: string
}
const ScrollDownIndicator: React.FC<iProps> = ({ isVisible,customKey }) => {
    return (
        <div
       
        key={`${customKey}-motion-div`}
        className="absolute right-2 bottom-2 font-normalFont z-50  bg-opacity-50 rounded-md transform -translate-x-1/2 flex flex-col items-center text-primaryYellow"
     
        >
          <WhatsAppLink />
            {/* <ArrowDownward  key={`${key}-button`} fontSize='medium' style={{fontWeight:'bolder'}} className='font-boldFont'   /> */}
            {/* <p  key={`${key}-para`} className="font-normalFont   mt-1">Scroll Down</p> */}
        </div>
    );
};

export default ScrollDownIndicator;
