import { render, screen, cleanup } from "@testing-library/react";
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

    expect(screen.getAllByRole("listitem")).toHaveLength(10);
    expect(screen.getAllByTestId("searchResults-list-url")[0]).toHaveAttribute("src", "image url");
    expect(screen.getAllByText("image description")).toHaveLength(10);
    expect(screen.getAllByTestId("searchResults-list-parentPage")[0]).toHaveAttribute("href", "image parentPage");
  });

  //----- Test 2 -----
  it("correctly switches pages", () => {
    // Mock prop functions
    const mockSetSearchResults = jest.fn();

    render(<SearchResults 
      searchResults={testData}
      setSearchResults={mockSetSearchResults}/>);

    expect(screen.getAllByText("Next")).toHaveLength(2);
    expect(screen.queryAllByText("Prev")).toHaveLength(0);
    expect(screen.getAllByText("Page 1")).toHaveLength(2);

    userEvent.click(screen.getAllByText("Next")[0]);

    expect(screen.getAllByText("Next")).toHaveLength(2);
    expect(screen.getAllByText("Prev")).toHaveLength(2);
    expect(screen.getAllByText("Page 2")).toHaveLength(2);
  });

  //----- Test 3 -----
  it("renders <EmptyResults/> if no search results exist", () => {
    render(<SearchResults searchResults={[]}/>);

    expect(screen.getByText("Browse for a variety of images"));
  });
});