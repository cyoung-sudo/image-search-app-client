import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
// Components
import SearchResults from "../SearchResults";

// Mocks
jest.mock("../../../apis/imageSearch");
window.scrollTo = jest.fn();

// Test data
const testData = Array(10).fill({
  description: "image description",
  parentPage: "image parentPage",
  url: "image url"
});

describe("<SearchBar/>", () => {
  afterEach(cleanup);

  //----- Test 1 -----
  it("displays search results", () => {
    render(<SearchResults searchResults={testData}/>);

    expect(screen.getAllByRole("searchResults-listItem")).toHaveLength(10);
    expect(screen.getAllByRole("searchResults-list-url")[0]).toHaveAttribute("src", "image url");
    expect(screen.getAllByRole("searchResults-list-desc")[0].textContent).toBe("image description");
    expect(screen.getAllByRole("searchResults-list-parentPage")[0]).toHaveAttribute("href", "image parentPage");
  });

  //----- Test 2 -----
  it("correctly switches pages", () => {
    // Mock prop functions
    const mockSetSearchResults = jest.fn();

    render(<SearchResults 
      searchResults={testData}
      setSearchResults={mockSetSearchResults}/>);

    expect(screen.getAllByRole("pagination-next")).toHaveLength(2);
    expect(screen.queryAllByRole("pagination-prev")).toHaveLength(0);
    expect(screen.getAllByRole("pagination-page")[0].textContent).toBe("Page 1");

    userEvent.click(screen.getAllByRole("pagination-next")[0]);

    expect(screen.getAllByRole("pagination-next")).toHaveLength(2);
    expect(screen.getAllByRole("pagination-prev")).toHaveLength(2);
    expect(screen.getAllByRole("pagination-page")[0].textContent).toBe("Page 2");
  });

  //----- Test 3 -----
  it("renders <EmptyResults/> if no search results exist", () => {
    render(<SearchResults searchResults={[]}/>);

    expect(screen.getByRole("emptyResults")).toBeInTheDocument();
  });
});