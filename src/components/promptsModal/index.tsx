import { Dispatch, SetStateAction } from 'react';
import { Dialog } from '@mui/material';
import CustomModal from '../Modal';

interface PromptsModalProps {
    setIsModalVisible: Dispatch<SetStateAction<boolean>>;
    isModalVisible: boolean;
}

const PromptsModal = (props: PromptsModalProps) => {
    const { setIsModalVisible, isModalVisible } = props;

    const topics = [
        "Family & Relationships",
        "Emotions and grief",
        "Workplace experiences",
        "Spirituality",
        "Finding Purpose",
        "Loneliness",
        "Stress and Anxiety",
        "Interests & Hobbies",
        "Daily life events",
        "Responsibilites related stress",
        "Giving back to Community"
    ]

    return (
        <CustomModal
            open={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            bgColor="white"
            fullScreen={false}
        >
            <div className='w-full flex flex-col justify-center items-center p-10 pb-0'>
                <h1 className="text-2xl p-2 text-center">Topics You can Talk About</h1>
                <ul className='gap-2 flex-col flex md:grid grid-cols-3 md:my-2'>
                    {topics.map((topic, index) => (
                        <li className='flex justify-center items-center border rounded-full font-normalFont bg-blue text-black p-2 text-center' key={index}>{topic}</li>
                    ))}
                </ul>
                <p className="text-center font-normalFont mb-2">Sometimes, you don't need a reason to share your feelings. Sukoon Sarathis would love to hear about your day.</p>
            </div>
        </CustomModal>
    );
};

export default PromptsModal;