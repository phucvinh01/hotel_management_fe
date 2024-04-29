import React from 'react'

const GoogleMap = ({query}:{query:string}) => {
    return (
    <iframe
      src={`https://www.google.com/search?q=${query}`}
      width="100%"
      height="500px"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}

export default GoogleMap