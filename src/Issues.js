import React, { useEffect, useState } from 'react';
import "./issues.css"
const Issues = () => {
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/facebook/react/issues?page=${page}`
        );
        const data = await response.json();
        setIssues(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIssues();
  }, [page]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <div className="container">
      <h1>GitHub Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <a href={issue.html_url} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous Page
        </button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
  
};

export default Issues;
