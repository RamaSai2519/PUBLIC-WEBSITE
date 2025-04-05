import { Dispatch, SetStateAction } from 'react';
import CustomModal from '../Modal';
import { Close } from '@mui/icons-material';
import Btn from '../button';
import { Space } from 'antd';

interface SpeakFlowModalProps {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isModalVisible: boolean;
}

const SpeakFlowModal = (props: SpeakFlowModalProps) => {
    const { setIsModalVisible, isModalVisible } = props;

    const steps = [
        {
            number: 1,
            title: 'Choose the Sarathi or Expert you like',
            description: 'Select a Sukoon Sarathi or Expert you want to speak to based on your objectives and their background & journey.',
        },
        {
            number: 2,
            title: 'Choose to Connect Now or Schedule for Later',
            description: 'Choose if you want to connect instantly over a voice call or plan for a later date and time.',
        },
        {
            number: 3,
            title: 'Connect over Call',
            description: 'Get a regular voice call from Sukoon Unlimited on your mobile at your chosen time connecting you to Sukoon Sarathis or Experts. No internet required.',
        },
    ];

    return (
        <CustomModal
            open={isModalVisible}
            closable={false}
            onClose={() => setIsModalVisible(false)}
            bgColor="white"
            fullScreen={false}
        >
            <div className="grid md:grid-cols-3 gap-10 justify-center h-full w-full p-7 relative">
                {steps.map((step, index) => (
                    <div key={step.number} className="flex flex-col items-center relative">
                        {/* Circle */}
                        <div className="relative w-full flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-primaryYellow flex items-center justify-center text-white font-bold z-10">
                                {step.number}
                            </div>
                            {/* Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden sm:block sm:absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-4 w-full h-[2px] bg-primaryYellow z-[999] ml-1" />
                            )}
                        </div>
                        <div className="text-center mt-4 gap-2 flex flex-col">
                            <h2 className="text-lg font-bold">{step.title}</h2>
                            <p className='font-normalFont'>{step.description}</p>
                        </div>
                    </div>
    ))}
</div>
        </CustomModal>
    );
};

export default SpeakFlowModal;