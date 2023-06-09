import Image from 'next/image'
import styles from './page.module.css'
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { Readability } = require('@mozilla/readability');

async function crawlArticle(url) {
  // Create a JSDOM instance and fetch the webpage content
  const dom = await JSDOM.fromURL(url);
  const doc = dom.window.document;

  // Create a Readability instance and parse the document
  const reader = new Readability(doc);
  const article = reader.parse();

  // Extract the article title and content
  const articleTitle = article.title;
  const articleContent = article.textContent.replace(/\n/g, '').replace(/\s\s+/g, ' ');

  return { title: articleTitle, content: articleContent };
}


async function processArticles(urls) {
  for (const url of urls) {
    try {
      const result = await crawlArticle(url);
      console.log('URL:', url);
      console.log('Title:', result.title);
      console.log('Content:', result.content);
      console.log('------------------------------------------------------');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

export default function Home() {
  const articleUrls = [
    'https://abcnews.go.com/US/7-injured-shooting-yuma-arizona-gathering-police/story?id=99313241',
    'https://www.foxnews.com/us/arizona-border-city-sees-7-people-shot-suspect-large-report',
    'https://www.cnn.com/2023/05/14/us/2-dead-5-injured-yuma-arizona-shooting/index.html'
  ];

  processArticles(articleUrls);

  return (
    <main className={styles.main}>
      <h1>Extract News Article Body From Url</h1>
    </main>
  );
}
