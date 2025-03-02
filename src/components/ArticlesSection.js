import React from "react";
import "./ArticlesSection.css";

const articles = [
  { id: 1, title: "How to Save Money Effectively", link: "#" },
  { id: 2, title: "Best Investment Strategies for 2025", link: "#" },
  { id: 3, title: "Understanding Credit Scores", link: "#" },
];

function ArticlesSection() {
  return (
    <div className="articles-section">
      <h2>Finance Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <a href={article.link}>{article.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticlesSection;
