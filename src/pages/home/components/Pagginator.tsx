import React, { useEffect, useState } from 'react';

import { EventCallable } from 'effector';

const Pagginator = (props: { repositories: { length: number }, selectedPage: number, changeSelectedPage: EventCallable<number>}) => {

    const {repositories, selectedPage, changeSelectedPage} = props;

    const [ pagginator, setPagginator ] = useState<number[]>([]);

    useEffect(() => {
        const pagginationSize = repositories.length / 10;

        if (!pagginationSize) {
            getPaggination(0);
        } else if (pagginationSize < 1) {
            getPaggination(1);
        } else if (pagginationSize <= 10) {
            getPaggination(pagginationSize);
        } else {
            getPaggination();
        }   
    }, [repositories]);

    const getPaggination = (size = 10) => {
        const newPagginator = [];

        for (let i = 1; i <= size; i++) {
            newPagginator.push(i);
        }

        setPagginator(newPagginator);
    };
    
    const leftArrowHandler = () => {
        if (pagginator.length !== 0 && pagginator[0] !== 1) {
            setPagginator(pagginator.map((item: number) => item - 1));
        }
    };

    const rightArrowHandler = () => {
        const pagginationSize = repositories.length / 10;
        if (pagginator.length > 1 && pagginator[pagginator.length - 1] !== pagginationSize) {
            setPagginator(pagginator.map((item: number) => item + 1));
        }
    };

    return (
        <footer className='home-footer' style={{display: pagginator.length !== 0 ? 'flex' : 'none'}}>
            <button onClick={leftArrowHandler}>{'<'}</button>
            <span className='paggination'>
                {...pagginator.map((item: number) => <span className={item === selectedPage ? 'active' : ''} onClick={() => changeSelectedPage(item)}>{item}</span>)}
            </span>
            <button onClick={rightArrowHandler}>{'>'}</button>
        </footer>
    );
};

export default Pagginator;
