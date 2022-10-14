import "./RecentSearches.css";
// React
import { useState, useEffect } from "react";
// Components
import Pagination from "./pagination/Pagination";
import Loading from "../loading/Loading";
// APIs
import ImageSearch from "../../apis/imageSearch";

export default function RecentSearches(props) {
  // Requested data
  const [recentSearches, setRecentSearches] = useState(null);
  // Loading status
  const [loading, setLoading] = useState(true);
  // Pagination
  const [page, setPage] = useState(1);
  const [pageContent, setPageContent] = useState([]);
  
  // Get recent-searches
  useEffect(() => {
    // Request for recent-searches
    ImageSearch.recent()
    .then(res => {
      if(res.data.recentSearches) {
        // Reverse ordering
        let reversedSearches = [...res.data.recentSearches].reverse();
        setRecentSearches([...reversedSearches]);
        setLoading(false);
      } else {
        props.handlePopUp("Server issue has occured. Please try later", "error");
        props.setMode("search");
      }
    })
    .catch(err => {
      // Server offline
      console.log(err);
      props.handlePopUp("Server issue has occured. Please try later", "error");
      props.setMode("search");
    });
  }, []);

  // Set page content
  useEffect(() => {
    if(!loading) handlePageContent(1, recentSearches);
  }, [recentSearches]);

  // Handle setting page content (20/page)
  const handlePageContent = (givenPage, givenSearches) => {
    let start = (givenPage - 1) * 20;
    let end = start + 20;
    let content = givenSearches.slice(start, end);
    setPageContent([...content]);
  };

  // Handle pagination
  const handlePage = type => {
    // Scroll to top of page
    window.scrollTo(0, 0);
    let newPage = page;
    if(type === "prev") {
      newPage -= 1;
    } else {
      newPage += 1;
    }
    setPage(newPage);
    handlePageContent(newPage, recentSearches);
  };

  // Check if page content is loaded
  if(!loading && (pageContent.length > 0)) {
    return (
      <ul role="recentSearches" id="recentSearches">
        {/*--- Pagination ---*/}
        <Pagination 
          page={page} 
          recentSearches={recentSearches} 
          handlePage={handlePage}/>
        {/*--- /Pagination ---*/}

        {/*--- Searches ---*/}
        {pageContent.map((search, idx) => (
          <li role="recentSearches-listItem" key={idx}>
            <div>{search.searchQuery}</div>
            <div>{search.timeSearched}</div>
          </li>
        ))}
        {/*--- /Searches ---*/}

        {/*--- Pagination ---*/}
        <Pagination 
          page={page} 
          recentSearches={recentSearches} 
          handlePage={handlePage}/>
        {/*--- /Pagination ---*/}
      </ul>
    );
  } else {
    return <Loading/>;
  }
};