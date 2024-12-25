import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({setsearchitem , setsearchbtn , searchitemsfromdb , searchbtn}) => {
    const [searchValue, setSearchValue] = useState("");
    
    const handleSearch = () => {
        setsearchbtn(true);
        if (searchValue) {
            setsearchitem(searchValue);
            setSearchValue("");
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search By Name ...."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            
            <button className="search-button" onClick={handleSearch}>
                🔍
            </button>
        </div>
    );
};

export default SearchBar;
