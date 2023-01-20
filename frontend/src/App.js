import { useState, useEffect } from 'react';

export default function App() {
  const [ data, setData ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    fetch(`http://api.solvann.eksempler.no/`)
    .then((response) => response.json())
    .then((actualData) => console.log(actualData))
    .catch((err) => {
      console.log(err.message);
      });
  }, []);

  return <div className="App">App</div>;
}