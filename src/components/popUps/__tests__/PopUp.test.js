import { render, screen, cleanup } from "@testing-library/react";
// Components
import PopUp from "../PopUp";

// Timer mock
jest.useFakeTimers();

describe("<PopUp/>", () => {
  afterEach(cleanup);

  //----- Test 1 -----
  it("correctly displays message text", () => {
    render(<PopUp 
      popUp="test message" 
      popUpType="success"/>);

    expect(screen.getByText("test message"));
  });

  //----- Test 2 -----
  it("correctly styles 'success' pop-ups", () => {
    render(<PopUp 
      popUp="test message" 
      popUpType="success"/>);

    expect(screen.getByTestId("popUp-msg").classList.contains("popUp-success")).toBe(true);
    expect(screen.getByTestId("popUp-msg").classList.contains("popUp-error")).toBe(false);
  });

  //----- Test 3 -----
  it("correctly styles 'error' pop-ups", () => {
    render(<PopUp 
      popUp="test message"
      popUpType="error"/>);

    expect(screen.getByTestId("popUp-msg").classList.contains("popUp-error")).toBe(true);
    expect(screen.getByTestId("popUp-msg").classList.contains("popUp-success")).toBe(false);
  });

  //----- Test 4 -----
  it("hides pop-up after given timeout (3sec)", async () => {
    const mockSetShowPopUp = jest.fn();

    render(<PopUp
      popUp="test message"
      popUpType="error"
      setShowPopUp={mockSetShowPopUp}/>);

    // Wait for pop-up timeout
    jest.advanceTimersByTime(3000);

    expect(mockSetShowPopUp).toHaveBeenCalledWith(false);
  });

  //----- Test 5 -----
  it("overrides existing pop-ups with new pop-ups", async () => {
    const mockSetShowPopUp = jest.fn();

    const { rerender } = render(<PopUp
      popUp="test message"
      popUpType="success"
      overridePopUp={false}
      setShowPopUp={mockSetShowPopUp}/>);

    // assert initial pop-up
    expect(screen.getByText("test message"));
    expect(screen.getByTestId("popUp-msg").classList.contains("popUp-success")).toBe(true);

    // Delay before state change (< initial pop-up timeout)
    jest.advanceTimersByTime(1000);

    rerender(<PopUp
      popUp="updated message"
      popUpType="error"
      overridePopUp={true}
      setShowPopUp={mockSetShowPopUp}/>);

    // assert new pop-up
    expect(screen.getByText("updated message"));
    expect(screen.getByTestId("popUp-msg").classList.contains("popUp-error")).toBe(true);

    // Wait for new pop-up timeout
    jest.advanceTimersByTime(3000);

    expect(mockSetShowPopUp).toHaveBeenCalledWith(false);
  });
});