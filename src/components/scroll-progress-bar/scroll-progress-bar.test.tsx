import React from 'react';
import { render, screen, fireEvent, queryByTestId } from '@testing-library/react';
import { toBeInTheDocument, toBeVisible, toHaveStyle } from '@testing-library/jest-dom/matchers';
import { act } from 'react-dom/test-utils';
import 'jest-styled-components';
expect.extend({ toBeInTheDocument, toBeVisible, toHaveStyle });

import ScrollProgressBar from './scroll-progress-bar';
import useScroll from '@hooks/useScroll';
import { ScrollProgressBarInterface } from '@components/scroll-progress-bar/interface';
jest.mock('@hooks/useScroll');

describe('scroll progress bar', () => {
    const genRandomNumber = (min:number, max:number):number => {
        return Math.floor(Math.random() * (max - min) + 1) + min;
    }
    const genRandomColor = ():string => {
        const colors = ['#FFD700', '#CD5C5C', '#FFFACD', '#90EE90', '#000080', 'red', 'blue', 'green'];
        return colors[genRandomNumber(0, colors.length - 1)];
    }

    it('the styles of the progress should be the equal to the default props if there are no props given', () => {
        const testProgress = 0;
        (useScroll as jest.Mock).mockReturnValue({
            progress: testProgress
        });
        render(<ScrollProgressBar></ScrollProgressBar>);

        expect(screen.queryByTestId('progress')).toHaveStyleRule('background-color', 'red');
        expect(screen.queryByTestId('progress')).toHaveStyleRule('width', `${testProgress}%`);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('height', '5px');
    });
    it('the styles of the progress should be the equal to the specified value (between 0 and 50)', () => {
        const testProgress = genRandomNumber(0, 50);
        const testProps:ScrollProgressBarInterface = {
            color: genRandomColor(),
            minHeight: genRandomNumber(0, 50),
            maxHeight: genRandomNumber(25, 100),
            callback: undefined
        };
        (useScroll as jest.Mock).mockReturnValue({
            progress: testProgress
        });
        render(<ScrollProgressBar {...testProps}></ScrollProgressBar>);

        expect(screen.queryByTestId('progress')).toHaveStyleRule('background-color', testProps.color);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('width', `${testProgress}%`);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('height', '5px');
    });
    it('the styles of the progress should be the equal to the specified value (between 50 and 75)', () => {
        const testProgress = genRandomNumber(50, 75);
        const testProps:ScrollProgressBarInterface = {
            color: genRandomColor(),
            minHeight: genRandomNumber(0, 50),
            maxHeight: genRandomNumber(25, 100),
            callback: undefined
        };
        (useScroll as jest.Mock).mockReturnValue({
            progress: testProgress
        });
        render(<ScrollProgressBar {...testProps}></ScrollProgressBar>);

        expect(screen.queryByTestId('progress')).toHaveStyleRule('background-color', testProps.color);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('width', `${testProgress}%`);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('height', `${testProps.minHeight}px`);
    });
    it('the styles of the progress should be the equal to the specified value (between 75 and 100)', () => {
        const testProgress = genRandomNumber(75, 100);
        const testProps:ScrollProgressBarInterface = {
            color: genRandomColor(),
            minHeight: genRandomNumber(0, 50),
            maxHeight: genRandomNumber(25, 100),
            callback: undefined
        };
        (useScroll as jest.Mock).mockReturnValue({
            progress: testProgress
        });
        render(<ScrollProgressBar {...testProps}></ScrollProgressBar>);

        expect(screen.queryByTestId('progress')).toHaveStyleRule('background-color', testProps.color);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('width', `${testProgress}%`);
        expect(screen.queryByTestId('progress')).toHaveStyleRule('height', `${testProps.maxHeight}px`);
    });
    it.todo('the callback function should be called at least once');
    // it.skip('the width of the progress bar should be increased while scrolling down', () => {
    //     render(<ScrollProgressBar>{genTestData()}</ScrollProgressBar>);
    //     // Object.defineProperty(screen.queryByTestId('target'), 'clientHeight', { value: 50 });
    //     // Object.defineProperty(screen.queryByTestId('target'), 'scrollTop', { value: 94 });
    //     // Object.defineProperty(screen.queryByTestId('target'), 'scrollHeight', { value: 144 });

    //     // expect(screen.queryByTestId('progress').clientWidth).toBeGreaterThan(0);
    //     // expect(screen.queryByTestId('progress')).toHaveStyle({width: '10%'});
    // });
    // it('the width of the progress bar should be increased while scrolling down', () => {
    //     render(<ScrollProgressBar>{genTestData()}</ScrollProgressBar>);
    //     Object.defineProperty(screen.queryByTestId('target'), 'clientHeight', { value: 50 });
    //     Object.defineProperty(screen.queryByTestId('target'), 'scrollHeight', { value: 144 });

    //     fireEvent.scroll(screen.queryByTestId('target'), {target:{scrollTop: 94}});

    //     // expect(screen.queryByTestId('progress').clientWidth).toBeGreaterThan(0);
    //     expect(screen.queryByTestId('progress')).toHaveStyle({width: '10%'});
    // });
});