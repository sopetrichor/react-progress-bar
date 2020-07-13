import { useState, useEffect, useRef } from 'react';

const useScroll = () => {
    const ref = useRef(null);
    const [position, setPosition] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);
    
    const handleScroll = (e: UIEvent) => {
        const {scrollHeight, scrollTop, clientHeight} = e.target as HTMLElement;
        let currProgress = 0;
        if (scrollTop > 0) {
            currProgress = Math.floor((scrollTop + clientHeight) / scrollHeight * 100);
        }
        setPosition(scrollTop);
        setProgress(currProgress);
    }

    useEffect(() => {
        const node = ref.current;
        if (node) {
            node.addEventListener('scroll', handleScroll);
            return () => {
                node.removeEventListener('scroll', handleScroll);
            };
        }
    }, [ref.current]);
    
    return {ref, position, progress};
}

export default useScroll;