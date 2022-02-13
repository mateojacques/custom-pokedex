import React from 'react'

const SearchLabel = ({searchQuery, setSearchQuery}) => {
  return (
      <>
      {searchQuery && <span className='search-label' onClick={() => setSearchQuery('')}>{searchQuery}</span>}
      </>
  )
}

export default SearchLabel