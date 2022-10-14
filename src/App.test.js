import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    expect(screen.getByRole("app-mode-recent")).toBeInTheDocument();
    expect(screen.queryByRole("app-mode-search")).not.toBeInTheDocument();
    expect(screen.getByRole("app-searchBar-wrapper")).toBeInTheDocument();
    expect(screen.getByRole("app-searchResults-wrapper")).toBeInTheDocument();
    expect(screen.queryByRole("app-recentSearches-wrapper")).not.toBeInTheDocument();
    
    // Toggle to "search" mode
    userEvent.click(screen.getByRole("app-mode-recent"));

    // Assert updated state
    expect(screen.queryByRole("app-mode-recent")).not.toBeInTheDocument();
    expect(screen.getByRole("app-mode-search")).toBeInTheDocument();
    expect(screen.queryByRole("app-searchBar-wrapper")).not.toBeInTheDocument();
    expect(screen.queryByRole("app-searchResults-wrapper")).not.toBeInTheDocument();
    expect(screen.getByRole("app-recentSearches-wrapper")).toBeInTheDocument();

    // Toggle to "recent" mode
    userEvent.click(screen.getByRole("app-mode-search"));

    // Assert updated state
    expect(screen.getByRole("app-mode-recent")).toBeInTheDocument();
    expect(screen.queryByRole("app-mode-search")).not.toBeInTheDocument();
    expect(screen.getByRole("app-searchBar-wrapper")).toBeInTheDocument();
    expect(screen.getByRole("app-searchResults-wrapper")).toBeInTheDocument();
    expect(screen.queryByRole("app-recentSearches-wrapper")).not.toBeInTheDocument();
  });
});
