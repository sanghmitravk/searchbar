import React, { useState } from 'react';
import { SearchList } from './SearchList';
export const SearchBar = () => {
    const [inputText, setInputText] = useState("");

    let inputHandler = (e: any) => {
        var lowerCase = e.target.value.toLowerCase();
        // setting the input text on state variable to passing down to the searchlist component
        setInputText(lowerCase);
    };

    return <div className='SearchBar'>
        <input
            type="search"
            id="outlined-basic"
            onChange={inputHandler}
            placeholder="Search User by Id, Name, etc..." />
        <SearchList inputText={inputText} />
    </div>
};

