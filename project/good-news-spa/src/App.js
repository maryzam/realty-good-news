import React, { useState, useEffect } from 'react';
import './App.css';

import hopeGenerator from './services/hopeGenerator';

import NewsCard from './components/newsCard';
import Preloader from './components/preloader';

const App = () => {

  const [news, setNews] = useState({ 
    news: [],
    isLoading: true
  });
 
  useEffect(() => {
    const fetchNews = async () => {
      const result = await hopeGenerator.getGoodNews({});
      setNews({
        news: result,
        isLoading: false
      });
    };
    fetchNews();
  }, []);

  return (
    <div className="App"> 
      { news.isLoading 
          ? <Preloader />
          : <NewsCard news={news.news} />
      }
    </div>
  );
}

export default App;
