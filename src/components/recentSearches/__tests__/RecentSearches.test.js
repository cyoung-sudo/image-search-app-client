import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Components
import RecentSearches from "../RecentSearches";

// Mocks
jest.mock("../../../apis/imageSearch");
window.scrollTo = jest.fn();

describe("<RecentSearches/>", () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(<RecentSearches />);
  })

  //----- Test 1 -----
  it("displays content after data has loaded", async () => {
    expect(screen.getByText("Loading..."));

    // Wait for list to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("recentSearches")).toBeInTheDocument();
    });

    expect(screen.getAllByText("cats")).toHaveLength(20);
    expect(screen.queryByText("Loading...")).toBeNull();
  })

  //----- Test 2 -----
  it("correctly displays recent searches", async () => {
    // Wait for list to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("recentSearches")).toBeInTheDocument();
    });

    expect(screen.getAllByText("cats")).toHaveLength(20);
    expect(screen.getAllByText("October 10th 2022, 3:16:28 pm")).toHaveLength(20);
  });

  //----- Test 3 -----
  it("correctly switches pages", async () => {
    // Wait for list to be displayed
    await waitFor(() => {
      expect(screen.getByTestId("recentSearches")).toBeInTheDocument();
    });

    // "next" buttons are shown & "prev" buttons are hidden
    expect(screen.getAllByText("Next")).toHaveLength(2);
    expect(screen.queryAllByText("Prev")).toHaveLength(0);
    expect(screen.getAllByText("Page 1")).toHaveLength(2);
    // Assert initial page content
    expect(screen.getAllByText("cats")).toHaveLength(20);
    expect(screen.getAllByText("October 10th 2022, 3:16:28 pm")).toHaveLength(20);
    
    userEvent.click(screen.getAllByText("Next")[0]);

    // Both "next" & "prev" buttons are shown
    expect(screen.getAllByText("Next")).toHaveLength(2);
    expect(screen.getAllByText("Prev")).toHaveLength(2);
    expect(screen.getAllByText("Page 2")).toHaveLength(2);
    // Assert updated page content
    expect(screen.getAllByText("dogs")).toHaveLength(20);
    expect(screen.getAllByText("October 11th 2022, 3:16:28 pm")).toHaveLength(20);

    userEvent.click(screen.getAllByText("Next")[0]);

    // "prev" buttons are shown & "next" buttons are hidden
    expect(screen.queryAllByText("Next")).toHaveLength(0);
    expect(screen.getAllByText("Prev")).toHaveLength(2);
    expect(screen.getAllByText("Page 3")).toHaveLength(2);
    // Assert updated page content
    expect(screen.getAllByText("dogs")).toHaveLength(5);
    expect(screen.getAllByText("October 11th 2022, 3:16:28 pm")).toHaveLength(5);
  })
});
