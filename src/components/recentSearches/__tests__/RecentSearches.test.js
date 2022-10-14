import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
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
    expect(screen.getByRole("loading")).toBeInTheDocument();

    // Wait for list to be displayed
    await waitFor(() => {
      expect(screen.getByRole("recentSearches")).toBeInTheDocument();
    });

    expect(screen.getAllByText("cats")).toHaveLength(20);
    expect(screen.queryByRole("loading")).not.toBeInTheDocument();
  })

  //----- Test 2 -----
  it("correctly displays recent searches", async () => {
    // Wait for list to be displayed
    await waitFor(() => {
      expect(screen.getByRole("recentSearches")).toBeInTheDocument();
    });

    expect(screen.getAllByRole("recentSearches-listItem")).toHaveLength(20);
    expect(screen.getAllByText("cats")).toHaveLength(20);
    expect(screen.getAllByText("October 10th 2022, 3:16:28 pm")).toHaveLength(20);
  });

  //----- Test 3 -----
  it("correctly switches pages", async () => {
    // Wait for list to be displayed
    await waitFor(() => {
      expect(screen.getByRole("recentSearches")).toBeInTheDocument();
    });

    // "next" buttons are shown & "prev" buttons are hidden
    expect(screen.getAllByRole("pagination-next")).toHaveLength(2);
    expect(screen.queryAllByRole("pagination-prev")).toHaveLength(0);
    expect(screen.getAllByRole("pagination-page")[0].textContent).toBe("Page 1");
    // Assert initial page content
    expect(screen.getAllByText("cats")).toHaveLength(20);
    expect(screen.getAllByText("October 10th 2022, 3:16:28 pm")).toHaveLength(20);
    
    userEvent.click(screen.getAllByRole("pagination-next")[0]);

    // Both "next" & "prev" buttons are shown
    expect(screen.getAllByRole("pagination-next")).toHaveLength(2);
    expect(screen.getAllByRole("pagination-prev")).toHaveLength(2);
    expect(screen.getAllByRole("pagination-page")[0].textContent).toBe("Page 2");
    // Assert updated page content
    expect(screen.getAllByText("dogs")).toHaveLength(20);
    expect(screen.getAllByText("October 11th 2022, 3:16:28 pm")).toHaveLength(20);

    userEvent.click(screen.getAllByRole("pagination-next")[0]);

    // "prev" buttons are shown & "next" buttons are hidden
    expect(screen.queryAllByRole("pagination-next")).toHaveLength(0);
    expect(screen.getAllByRole("pagination-prev")).toHaveLength(2);
    expect(screen.getAllByRole("pagination-page")[0].textContent).toBe("Page 3");
    // Assert updated page content
    expect(screen.getAllByText("dogs")).toHaveLength(5);
    expect(screen.getAllByText("October 11th 2022, 3:16:28 pm")).toHaveLength(5);
  })
});
