import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';

import useScroll from '@hooks/useScroll';
import { ScrollProgressBarInterface } from './interface';

const Wrapper = styled.div`
    position: relative;
`;
const Target = styled.div`
    position: relative;
    height: 50px;
    overflow: hidden;
    overflow-y: scroll;
`;
const Progress = styled.div`
    position: absolute;
    bottom: 0px;
    width: ${props => `${props.width}%`};
    height: ${props => `${props.height}px`};
    background-color: ${props => props.color};
`;

const ScrollProgressBar: React.FC<ScrollProgressBarInterface> = (props) => {
    const { color, minHeight, maxHeight, callback } = props;
    const { ref:scrollRef, position, progress } = useScroll();
    const [currProgressHeight, setCurrProgressHeight] = useState<number>(5);

    useEffect(() => {
        if (progress > 50) {
            setCurrProgressHeight(minHeight);
        }
        if (progress > 75) {
            setCurrProgressHeight(maxHeight);
        }
    }, [progress, minHeight, maxHeight]);

    return (
        <Wrapper data-testid='scroll-progress-bar'>
            <Target ref={scrollRef} data-testid='target'>
                {props.children}
            </Target>
            <Progress width={progress} height={currProgressHeight} color={color} data-testid='progress'></Progress>
        </Wrapper>
    )
}

ScrollProgressBar.defaultProps = {
    color: 'red',
    minHeight: 5,
    maxHeight: 20,
    callback: undefined
}

export default ScrollProgressBar;