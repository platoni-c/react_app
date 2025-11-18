import React from 'react'

const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className={"search"}>
            <div>
                <img src="../../search.svg" alt="Search Icon"/>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className={"capitalize"}/>
            </div>
        </div>
    )
}
export default Search
