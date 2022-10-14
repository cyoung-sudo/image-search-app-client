import "./App.css";
// React 
import { useState, useEffect } from "react";
// Components
import PopUp from "./components/popUps/PopUp";
import SearchBar from "./components/searchBar/SearchBar";
import SearchResults from "./components/searchResults/SearchResults";
import RecentSearches from "./components/recentSearches/RecentSearches";
import Footer from "./components/footer/Footer";

function App() {
  // Searching
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // Display Mode
  const [mode, setMode] = useState("search");
  // Pop-up
  const [popUp, setPopUp] = useState("");
  const [popUpType, setPopUpType] = useState("success");
  const [showPopUp, setShowPopUp] = useState(false);
  const [overridePopUp, setOverridePopUp] = useState(false); // trigger to override existing pop-up

  // Scroll to top of page on mount
  //*** Issue: sometimes triggers before render
  //*** Temp Fix: set minor delay
  useEffect(() => {
    setTimeout(() => {
      console.log("App mounted: scroll to top");
      window.scrollTo(0, 0);
    }, 100);
  }, []);

  // Handle displaying pop-up
  const handlePopUp = (message, type) => {
    // Override existing pop-up
    if(showPopUp) {
      console.log("override");
      setOverridePopUp(state => !state);
    }
    setPopUp(message);
    setPopUpType(type);
    setShowPopUp(true);
    // Scroll to top of page
    window.scrollTo(0, 0);
  };

  return (
    <div id="app">
      <div id="app-content">
        {/*----- Pop-up -----*/}
        {showPopUp && <div id="popUps-wrapper">
          <PopUp
            popUp={popUp}
            popUpType={popUpType}
            overridePopUp={overridePopUp}
            setShowPopUp={setShowPopUp}/>
        </div>}
        {/*----- /Pop-up -----*/}

        <div id="app-header">
          <h1>Image Search</h1>
        </div>

        <div id="app-mode">
          {(mode === "recent") && 
            <button
              role="app-mode-search"
              onClick={() => setMode("search")}>Search Images</button>}
          {(mode === "search") && 
            <button 
              role="app-mode-recent"
              onClick={() => setMode("recent")}>Recent Searches</button>}
        </div>

        {/*----- Search Bar -----*/}
        {(mode === "search") && 
          <div 
            role="app-searchBar-wrapper"
            id="app-searchBar-wrapper">
            <SearchBar
              setSearchInput={setSearchInput}
              setSearchResults={setSearchResults}
              handlePopUp={handlePopUp}/>
          </div>
        }
        {/*----- /Search Bar -----*/}

        {/*----- Search Results -----*/}
        {(mode === "search") && 
          <div
            role="app-searchResults-wrapper"
            id="app-searchResults-wrapper">
            <SearchResults
              searchInput={searchInput}
              searchResults={searchResults}
              mode={mode}
              setSearchResults={setSearchResults}
              handlePopUp={handlePopUp}/>
          </div>
        }
        {/*----- /Search Results -----*/}

        {/*----- Recent Searches -----*/}
        {(mode === "recent") && 
          <div 
            role="app-recentSearches-wrapper"
            id="app-recentSearches-wrapper">
            <RecentSearches 
              setMode={setMode}
              handlePopUp={handlePopUp}/>
          </div>
        }
        {/*----- /Recent Searches -----*/}
      </div>
      <Footer/>
    </div>
  );
}

export default App;
