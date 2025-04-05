import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
    audioUrl?: string;
    show: boolean;
    onClose?: () => void;
}
const AudioPlayer: React.FC<AudioPlayerProps> = (props) => {

    const { audioUrl ='https://sukoon-media.s3.ap-south-1.amazonaws.com/Audio1.mp3', show=false,onClose } = props
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isClose, setIsClose] = useState(true);
    useEffect(() => {
        const handleVisibilityChange = () => {
            
            if (document.hidden) {
                audioRef.current?.pause();
            } else if (isPlaying) {
                audioRef.current?.play();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isPlaying]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
        setIsClose(!isClose)
    };

    return (
        <Modal open={show} width={150}  closable footer={<></>} centered onCancel={()=> {
           
            isPlaying ? togglePlayPause() : null
            onClose && onClose()
        
        } }>
            <div className="flex flex-col items-center p-4 rounded-lg  max-w-sm mx-auto mt-10">
                <audio ref={audioRef} autoPlay src={audioUrl} />
                <button
                    onClick={togglePlayPause}
                    className="text-green text-lg font-heavyFont"
                >
                    {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </Modal>
    );
};

export default AudioPlayer;
