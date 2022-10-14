import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
// Components
import SearchBar from "../SearchBar";

// Mocks
jest.mock("../../../apis/imageSearch");

describe("<SearchBar/>", () => {
  afterEach(cleanup);
  
  //----- Test 1 -----
  it("correctly submits valid search input", async () => {
    // Mock prop functions
    const mockSetSearchInput = jest.fn();
    const mockSetSearchResults = jest.fn();
    const mockHandlePopUp = jest.fn();

    render(<SearchBar
      setSearchInput={mockSetSearchInput}
      setSearchResults={mockSetSearchResults}
      handlePopUp={mockHandlePopUp}/>);

    // Search for "cat"
    userEvent.type(screen.getByRole("searchBar-input"), "cat");
    userEvent.click(screen.getByRole("searchBar-submit"));

    const testData = Array(10).fill({
      description: "image description",
      parentPage: "image parentPage",
      url: "image url"
    });
    await waitFor(() => {
      expect(mockSetSearchInput).toHaveBeenCalledWith("cat");
      expect(mockSetSearchResults).toHaveBeenCalledWith(testData);
      expect(mockHandlePopUp).toHaveBeenCalledWith('Searched for "cat"', "success");
    });
  });

  //----- Test 2 -----
  it("displays pop-up message for submitting empty input", () => {
    // Mocked functions
    const mockHandlePopUp = jest.fn();

    render(<SearchBar handlePopUp={mockHandlePopUp}/>);

    // Search with empty string
    userEvent.click(screen.getByRole("searchBar-submit"));

    expect(mockHandlePopUp).toHaveBeenCalledWith("Search input is empty", "error");
  });
});