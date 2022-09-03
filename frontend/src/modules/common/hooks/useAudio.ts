import React, { useRef } from 'react';

const useAudio = (url: string) => {
    // create audioRef.current only once
    const audioRef = useRef<null | HTMLAudioElement>();

    // same as React.Component.forceUpdate
    const [, _forceUpdate] = React.useState(false);
    const forceUpdate = () => _forceUpdate((prevState) => !prevState);

    React.useEffect(() => {
        if (audioRef.current === null) {
            audioRef.current = new Audio(url);
            audioRef.current.play();
            audioRef.current.addEventListener('play', forceUpdate);
            audioRef.current.addEventListener('pause', forceUpdate);
            audioRef.current.addEventListener('ended', forceUpdate);
            audioRef.current.addEventListener('timeupdate', forceUpdate);
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('play', forceUpdate);
                audioRef.current.removeEventListener('pause', forceUpdate);
                audioRef.current.removeEventListener('ended', forceUpdate);
                audioRef.current.addEventListener('timeupdate', forceUpdate);
            }
        };
    }, []);

    const play = () => {
        if (audioRef.current) {
            audioRef?.current.play();
        }
    };
    const pause = () => audioRef.current && audioRef?.current.pause();

    return {
        play,
        pause,
    };
};

export default useAudio;
