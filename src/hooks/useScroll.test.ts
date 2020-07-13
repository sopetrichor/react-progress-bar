import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import useScroll from './useScroll';
import { fireEvent } from '@testing-library/react';

describe('useScroll', () => {
    it('no scroll - the position and progress should be equal to 0', () => {
        const el = document.createElement('div');
        const mockScrollHeight = 1000;
        const mockClientHeight = 500;
        jest.spyOn(el, 'scrollHeight', 'get').mockImplementation(() => mockScrollHeight);
        jest.spyOn(el, 'clientHeight', 'get').mockImplementation(() => mockClientHeight);
        jest.spyOn(React, 'useRef').mockImplementation(() => ({current: el}));
        const { result } = renderHook(() => useScroll());

        act(() => {
            fireEvent.scroll(el);
        });
        expect(result.current.position).toEqual(0);
        expect(result.current.progress).toEqual(0);
    });
    it('scroll to the bottom - the position and progress should be equal to 100', () => {
        const el = document.createElement('div');
        const mockScrollHeight = 1000;
        const mockScrollTop = 500;
        const mockClientHeight = 500;
        jest.spyOn(el, 'scrollHeight', 'get').mockImplementation(() => mockScrollHeight);
        jest.spyOn(el, 'scrollTop', 'get').mockImplementation(() => mockScrollTop);
        jest.spyOn(el, 'clientHeight', 'get').mockImplementation(() => mockClientHeight);
        jest.spyOn(React, 'useRef').mockImplementation(() => ({current: el}));
        const { result } = renderHook(() => useScroll());

        act(() => {
            fireEvent.scroll(el);
        });

        expect(result.current.position).toEqual(mockScrollTop);
        expect(result.current.progress).toEqual(100);
    });
    it('scroll down and then up - the position and progress shoud be increased and then decreased', () => {
        const el = document.createElement('div');
        const offsetScroll = 200;
        const mockScrollHeight = 1000;
        const mockScrollTop = 100;
        const mockScrollTop2 = mockScrollTop + offsetScroll;
        const mockScrollTop3 = mockScrollTop2 - offsetScroll;
        const mockClientHeight = 500;
        jest.spyOn(el, 'scrollHeight', 'get').mockImplementation(() => mockScrollHeight);
        jest.spyOn(el, 'scrollTop', 'get').mockImplementation(() => mockScrollTop);
        jest.spyOn(el, 'clientHeight', 'get').mockImplementation(() => mockClientHeight);
        jest.spyOn(React, 'useRef').mockImplementation(() => ({current: el}));
        const { result } = renderHook(() => useScroll());

        act(() => {
            fireEvent.scroll(el);
        });

        expect(result.current.position).toEqual(mockScrollTop);
        expect(result.current.progress).toEqual(60);

        jest.spyOn(el, 'scrollTop', 'get').mockImplementation(() => mockScrollTop2);
        
        act(() => {
            fireEvent.scroll(el);
        });

        expect(result.current.position).toEqual(mockScrollTop2);
        expect(result.current.progress).toEqual(80);

        jest.spyOn(el, 'scrollTop', 'get').mockImplementation(() => mockScrollTop3);
        
        act(() => {
            fireEvent.scroll(el);
        });
        
        expect(result.current.position).toEqual(mockScrollTop3);
        expect(result.current.progress).toEqual(60);
    });
});