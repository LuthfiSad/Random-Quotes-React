import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  useEffect(() => {
    getQuote();
    randomRgb();
  }, []);

  const getQuote = async () => {
    // let url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     let dataQuotes = data.quotes;
    //     let randomNum = Math.floor(Math.random() * dataQuotes.length);
    //     let randomQuote = dataQuotes[randomNum];

    //     setQuote(randomQuote.quote);
    //     setAuthor(randomQuote.author);
    //   });
    await fetch('https://api.quotable.io/random')
      .then((res) => res.json())
      .then((data) => {
        if(data.content && data.author) {
          setQuote(data.content);
          setAuthor(data.author);
        }
        else {
            return console.error('404 No quotes found!')
        }
      });
  };

  useEffect(() => {
    document.body.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    const targetElement1 = document.querySelector('#text');
    const targetElement2 = document.querySelector('#author');
    fadeInWithSteps(targetElement1, targetElement2);
  }, [red, green, blue]);

  const fadeInWithSteps = (element1, element2, currentOpacity = 0) => {
    if (currentOpacity <= 1) {
      element1.style.opacity = currentOpacity;
      element2.style.opacity = currentOpacity;
      setTimeout(() => {
        fadeInWithSteps(element1, element2, currentOpacity + 0.1);
      }, 50);
    }
  };

  const style = {
    background: `rgb(${red}, ${green}, ${blue})`,
    color: `#fff`
  };

  const randomRgb = () => {
    setRed(Math.floor(Math.random() * 255))
    setGreen(Math.floor(Math.random() * 255))
    setBlue(Math.floor(Math.random() * 255))
  };

  const handleClick = async () => {
    await getQuote();
    randomRgb();
  };

  return (
    <div style={{color: `rgb(${red}, ${green}, ${blue})`}} id="quote-box">
      <div id="text">
        <p><i style={{ marginRight: '1rem' }} class="fa-solid fa-quote-left"></i>{quote}</p>
      </div>
      <div id="author">
        <p>- {author}</p>
      </div>

      <div id="buttons">
        <div className="social-media">
          <a style={style} target="_blank" href={`https://twitter.com/intent/tweet?hashtags=quotes&text=%22${encodeURIComponent(quote)}.%22%20${encodeURIComponent(author)}`} id="twet-quote">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a style={style} target="_blank" href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=${encodeURIComponent(author)}&content=${encodeURIComponent(quote)}.&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`} id="tumlr-quote">
            <i className="fa-brands fa-tumblr"></i>
          </a>
        </div>
        <button style={style} onClick={handleClick} id="new-quote">
          New Quote
        </button>
      </div>
    </div>
  );
};

export default Quotes;
