import "./SearchResults.css";
// React
import { useState, useEffect } from "react";
// Components
import Pagination from "./pagination/Pagination";
import EmptyResults from "./emptyResults/EmptyResults";
// APIs
import imageSearch from "../../apis/imageSearch";

export default function SearchResults(props) {
  // Pagination
  const [page, setPage] = useState(1);

  // Reset page on search-input change
  useEffect(() => {
    if(page !== 1) {
      setPage(1);
    }
  }, [props.searchInput]);

  // Reset page content on mode switch
  useEffect(() => {
    if(props.mode === "search" && (props.searchInput.length > 0)) {
      handleRequest(1);
    }
  }, [props.mode]);

  // Handle pagination
  const handlePage = type => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    let newPage = page;
    if(type === "prev") {
      newPage -= 1;
      setPage(state => state - 1);
    } else {
      newPage += 1;
      setPage(state => state + 1);
    }
    handleRequest(newPage);
  };

  // Get images for given page
  const handleRequest = givenPage => {
    // Request images for given page
    imageSearch.search(props.searchInput, givenPage)
    .then(res => {
      if(res.data.searchResults) {
        props.setSearchResults(res.data.searchResults);
      }
    })
    .catch(err => {
      console.log(err);
      props.setSearchResults([]);
      props.handlePopUp("Server issue has occured. Please try later", "error");
    });
  };

  if(props.searchResults.length > 0) {
    return (
      <div id="searchResults">
        <div id="searchResults-header">
          <div>Search results for "{props.searchInput}"</div>
        </div>
  
        {/*----- List -----*/}
        <ul id="searchResults-list">
          {/*--- Pagination ---*/}
          <Pagination
            page={page}
            handlePage={handlePage}/>
          {/*--- /Pagination ---*/}
  
          {/*--- Images ---*/}
          {props.searchResults.map((result, idx) => (
            <li role="searchResults-listItem" key={idx}>
              <a className="searchResults-listItem-image" href={result.url} target="_blank" rel="noreferrer">
                <img role="searchResults-list-url" src={result.url}/>
              </a>
              <div className="searchResults-listItem-content">
                <div role="searchResults-list-desc">{result.description}</div>
                <a role="searchResults-list-parentPage" href={result.parentPage} target="_blank" rel="noreferrer">Visit Parent Page</a>
              </div>
            </li>
          ))}
          {/*--- /Images ---*/}
  
          {/*--- Pagination ---*/}
          <Pagination
            page={page}
            handlePage={handlePage}/>
          {/*--- /Pagination ---*/}
        </ul>
        {/*----- /List -----*/}
      </div>
    );
  } else {
    return <EmptyResults/>;
  }
};