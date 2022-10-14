import "./SearchBar.css";
// React
import { useState } from "react";
// APIs
import ImageSearch from "../../apis/imageSearch";

export default function SearchBar(props) {
  // Controlled input
  const [searchInput, setSearchInput] = useState("");

  // Get search results
  const handleSubmit = e => {
    // Prevent refresh on submit
    e.preventDefault();
    // Validations
    if(searchInput === "") {
      props.handlePopUp("Search input is empty", "error");
    } else {
      // Request images for given page
      ImageSearch.search(searchInput, 1)
      .then(res => {
        if(res.data.searchResults) {
          props.setSearchInput(searchInput);
          props.setSearchResults(res.data.searchResults);
          props.handlePopUp(`Searched for "${searchInput}"`, "success");
        } else {
          props.handlePopUp("Server issue has occured. Please try later", "error");
        }
      })
      .catch(err => console.log(err));
    }
  };

  return (
    <form id="searchBar" onSubmit={handleSubmit}>
      <div className="searchBar-input">
        <input 
          role="searchBar-input"
          type="text"
          placeholder="image search"
          onChange={e => setSearchInput(e.target.value)}/>
      </div>

      <div className="searchBar-submit">
        <input 
          role="searchBar-submit"
          type="submit" 
          value="Search"/>
      </div>
    </form>
  );
};