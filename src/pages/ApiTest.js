import React, {useState, useEffect, useRef} from 'react';

export const ApiTest = () => {
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch("/api/users/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResults(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [])
  const output = results.map((result) => {return (<li key={result.id}>{result.username}</li>)})
  return (
    <ul>
      {output}
    </ul>
  )
}