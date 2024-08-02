import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const handleSubmit = async () => {
    try {
      setError('');
      const jsonData = JSON.parse(input);
      const res = await axios.post('https://bajaj-finserv-health-s7mb.onrender.com-/bfhl', jsonData); // Adjust the URL if needed
      setResponse(res.data);
    } catch (error) {
      setError('Invalid JSON input or server error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_alphabet } = response;
    let filteredData = {};

    if (selectedOptions.includes('Numbers')) filteredData.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) filteredData.alphabets = alphabets;
    if (selectedOptions.includes('Highest Alphabet')) filteredData.highest_alphabet = highest_alphabet;

    return (
      <div>
        <h2>Filtered Response:</h2>
        <pre>{JSON.stringify(filteredData, null, 2)}</pre>
      </div>
    );
  };

  React.useEffect(() => {
    document.title = 'Frontend';
  }, []);

  return (
    <div className="container">
      <textarea
        className="textarea"
        value={input}
        onChange={handleInputChange}
        rows="5"
        placeholder='Enter API input here, e.g., { "data": ["A","C","z"] }'
      />
      <button className="button" onClick={handleSubmit}>Submit</button>
      <select
        className="select"
        multiple
        onChange={handleSelectChange}
        aria-label="Filter options"
      >
        <option value="Alphabets">Alphabets</option>
        <option value="Numbers">Numbers</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      {error && <div className="error">{error}</div>}
      {renderResponse()}
    </div>
  );
};

export default App;
