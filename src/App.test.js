import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import App from "./App";

// Mocked child components
jest.mock("./components/recentSearches/RecentSearches", () => () => (
  <div>RecentSearches</div>
));
jest.mock("./components/searchBar/SearchBar", () => () => (
  <div>SearchBar</div>
));
jest.mock("./components/searchResults/SearchResults", () => () => (
  <div>SearchResults</div>
));

describe("<App/>", () => {
  afterEach(cleanup);

  //----- Test 1 -----
  it("correctly toggles through 'search' and 'recent' modes" , () => {
    render(<App />);

    // Assert initial state
    expect(screen.getByText("Recent Searches"));
    expect(screen.queryByText("Search Images")).toBeNull();
    expect(screen.getByTestId("app-searchBar-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("app-searchResults-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("app-recentSearches-wrapper")).toBeNull();
    
    // Toggle to "search" mode
    userEvent.click(screen.getByText("Recent Searches"));

    // Assert updated state
    expect(screen.queryByText("Recent Searches")).toBeNull();
    expect(screen.getByText("Search Images"));
    expect(screen.queryByTestId("app-searchBar-wrapper")).toBeNull();
    expect(screen.queryByTestId("app-searchResults-wrapper")).toBeNull();
    expect(screen.getByTestId("app-recentSearches-wrapper")).toBeInTheDocument();

    // Toggle to "recent" mode
    userEvent.click(screen.getByText("Search Images"));

    // Assert updated state
    expect(screen.getByText("Recent Searches"));
    expect(screen.queryByText("Search Images")).toBeNull();
    expect(screen.getByTestId("app-searchBar-wrapper")).toBeInTheDocument();
    expect(screen.getByTestId("app-searchResults-wrapper")).toBeInTheDocument();
    expect(screen.queryByTestId("app-recentSearches-wrapper")).toBeNull();
  });
});
