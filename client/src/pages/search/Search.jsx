import React, { useState } from 'react';

import Nav from '../../components/browse/Nav';
import SearchResult from '../../components/search/SearchResult';
import './Search.css';

const genre = [
  { id: '', name: 'Default' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
const mediaType = ['movie', 'tv', 'person'];
const language = ['en', 'ja', 'ko'];
const year = ['2019', '2020', '2021', '2022', '2023'];

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedOptionGenre, setSelectedOptionGenre] = useState('');
  const [selectedOptionMediaType, setSelectedOptionMediaType] = useState('');
  const [selectedOptionLanguage, setSelectedOptionLanguage] = useState('');
  const [selectedOptionYear, setSelectedOptionYear] = useState('');

  const handleSearch = () => {
    setQuery(searchInput);
  };

  const resetSearch = () => {
    setQuery('');
    setSearchInput('');
    setSelectedOptionGenre('');
    setSelectedOptionMediaType('');
    setSelectedOptionLanguage('');
    setSelectedOptionYear('');
  };

  return (
    <div className="app">
      <Nav />

      <div className="s009">
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <label>-------Genre-------</label>
            <select onChange={e => setSelectedOptionGenre(e.target.value)}>
              {genre.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginRight: '20px' }}>
            <label>-------Media Type-------</label>
            <select onChange={e => setSelectedOptionMediaType(e.target.value)}>
              <option value={''}>All</option>
              {mediaType.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginRight: '20px' }}>
            <label>-------Language-------</label>
            <select onChange={e => setSelectedOptionLanguage(e.target.value)}>
              <option value={''}>Default</option>
              {language.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>-------Year-------</label>
            <select onChange={e => setSelectedOptionYear(e.target.value)}>
              <option value={''}>Default</option>
              {year.map((item, i) => (
                <option key={i} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form>
          <div className="inner-form">
            <div className="basic-search">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Type Keywords"
                  onChange={e => setSearchInput(e.target.value)}
                  value={searchInput}
                />
                <div className="icon-wrap">
                  <svg
                    className="svg-inline--fa fa-search fa-w-16"
                    fill="#ccc"
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="advance-search">
              <div className="row third">
                <div className="input-field">
                  <div className="result-count"></div>
                  <div className="group-btn">
                    <button
                      className="btn-delete"
                      onClick={resetSearch}
                      type="button"
                    >
                      RESET
                    </button>
                    <button
                      className="btn-search"
                      type="button"
                      onClick={() => handleSearch()}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SearchResult
        query={query}
        genre={selectedOptionGenre}
        mediaType={selectedOptionMediaType}
        language={selectedOptionLanguage}
        year={selectedOptionYear}
      />
    </div>
  );
};

export default Search;
