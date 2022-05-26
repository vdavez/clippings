const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { Readability } = require("readability");
const createDOMPurify = require('dompurify');

/**
 * Takes a url and returns a parsed article
 * @param {str} url The article's url
 * @returns {Promise<article>} promise of the parsed article object
 **/
const getArticleFromURL = async url => {
  return axios
    .get(url, {
      validateStatus: function(status) {
        return status < 400; // Reject only if the status code is greater than or equal to 500
      }
    })
    .then(function(response) {
      const window = new JSDOM("").window;
      const DOMPurify = createDOMPurify(window);
      let clean = DOMPurify.sanitize(response.data, { USE_PROFILES: { html: true } });
      let reader = new Readability(new JSDOM(clean, {url:url}).window.document);
      let article = reader.parse();
      return article;
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * This function takes a list of urls and creates a Promise
 * @param {array<string>} urls Takes an array of url strings
 * @returns {Promise} promise with an array of parsed articles
 **/
const getArticlesFromUrlArray = async urls => {
  return Promise.all(urls.map(d => getArticleFromURL(d)));
};

const articles = {};
articles.getArticleFromURL = getArticleFromURL;
articles.getArticlesFromUrlArray = getArticlesFromUrlArray;

module.exports = articles;
