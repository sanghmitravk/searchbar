import React from 'react';
import { list } from '../data/list';
export const SearchList = ({ inputText }: any) => {

    const filteredData = list.filter((el) => {
        if (inputText === '') {
            return el;
        }
        else {
            let divTag = document.getElementById("input");
            let reg = new RegExp(inputText, "gi");
            if (divTag && divTag.textContent) {
                divTag.innerHTML = (divTag.textContent).replace(reg, "<mark>$&</mark>")
            }
            return (el.name.toLowerCase().includes(inputText) || el.id.toLowerCase().includes(inputText) || el.address.toLowerCase().includes(inputText))
                || el.pincode.toLowerCase().includes(inputText) || el.items.some(item => item.toLowerCase().includes(inputText))
        }
    })
    return (
        <div className='SearchList' >
            {
                filteredData.length > 0 ? filteredData.map((item) =>
                    <div className='Card field' >
                        <div><strong>{item.id}</strong></div>
                        <div ><i>{item.name}</i></div>
                        <div>{item.items.map((item) => <>{item}&nbsp;</>)}</div>
                        <div >{item.address}</div>
                        <div >{item.pincode}</div>
                    </div>
                ) : <div className='Card UserNotFound'>User Not Found</div>
            }
        </div >
    )
};

