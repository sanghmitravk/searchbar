import React, { useEffect, useReducer } from 'react';
import { list } from '../data/list';
import { useKeyPress } from '../hooks/useKeyPress';
import { reducer, initialState } from '../reducer/reducer';
export const SearchList = ({ inputText }: any) => {
    const arrowUpPressed = useKeyPress('ArrowUp');
    const arrowDownPressed = useKeyPress('ArrowDown');
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (arrowUpPressed) {
            const element = document.getElementById("SearchList");
            dispatch({ type: 'arrowUp', scrollElement: element });

        }
    }, [arrowUpPressed]);

    useEffect(() => {
        if (arrowDownPressed) {
            const element = document.getElementById("SearchList");
            dispatch({ type: 'arrowDown', scrollElement: element });
        }
    }, [arrowDownPressed]);

    useEffect(() => {
        const highlightingText = () => {
            let divTag = document.getElementsByClassName("input");
            let reg = new RegExp(inputText, "gi");
            for (let i = 0; i < divTag.length; i++) {
                if (divTag[i]) {
                    const data = divTag[i].textContent;
                    if (data) {
                        divTag[i].innerHTML = (data).replace(reg, "<mark>$&</mark>")
                    }

                }
            }
        }
        highlightingText(); // this function is setting blue color to searched text from the list.
    }, [inputText])
    const filteredData = list.filter((el) => { // this funtion is filtering the card of the data that is found in the list
        if (inputText === '') {
            return el;
        }
        else {                                                      // condition to filter the data from each field.
            return (el.name.toLowerCase().includes(inputText) ||
                el.id.toLowerCase().includes(inputText) ||
                el.address.toLowerCase().includes(inputText)) ||
                el.pincode.toLowerCase().includes(inputText) ||
                el.items.some(item => item.toLowerCase().includes(inputText))
        }
    })

    return (
        <div className='SearchList' id="SearchList">
            {
                filteredData.length > 0 ? filteredData.map((item, index) =>                  // this map is displaying the list of card/data
                    <div className={`Card ${index === state.selectedIndex ? 'HightlightedCard' : ''}`}
                        key={index}
                        onClick={() => {
                            dispatch({ type: 'select', payload: index });
                        }}
                        aria-pressed={index === state.selectedIndex}
                        tabIndex={index}
                        onKeyPress={(e) => {
                            console.log('press')
                            if (e.key === 'Enter') {
                                dispatch({ type: 'select', payload: index });
                                (e.target as HTMLElement).blur();
                            }
                        }}
                    >
                        <div className='input'>{item.id}</div>
                        <div className='input'>{item.name}</div>
                        <div>{item.items.map((item, index) =>
                            item === inputText ? <ul key={index}><li>"{item}" found in items.</li></ul> : ''
                        )}</div>
                        <div className='input'>{item.address}</div>
                        <div className='input'>{item.pincode}</div>
                    </div>
                ) : <div className='Card UserNotFound'>User Not Found</div>
            }
        </div>
    )
};

