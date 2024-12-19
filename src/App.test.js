import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import UsersAPI from "./api/UsersAPI";
import BaseAPI from "./api/BaseAPI";
import EventsAPI from "./api/EventsAPI";
import GroupsAPI from "./api/GroupsAPI";

// mock all even if not used
// there is an issue with package tranformers that causes jest to not work
jest.mock("./api/UsersAPI", () => ({
  authenticate: jest.fn(),
  logout: jest.fn(),
}));
jest.mock("./api/EventsAPI", () => ({
  getAll: jest.fn(),
}));
jest.mock("./api/GroupsAPI", () => ({
  getRecentPosts: jest.fn(),
}));
jest.mock("./api/ImagesAPI", () => {});
jest.mock("./api/LocationsAPI", () => {});
jest.mock("./api/BaseAPI", () => ({
  token: null,
}));
jest.mock("./components/NavBar", () => ({ isInitializing }) => (
  <div>{isInitializing ? "NavBar Loading" : "NavBar Loaded"}</div>
));

describe("App Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loader while initializing", async () => {
    render(<App />);

    // initial state is loading until UsersAPI.authenticate request is resolved
    expect(screen.getByTestId("loader")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId("welcome-page")).not.toBeInTheDocument();
    });
  });

  it("renders welcome page when init success - user not logged in", async () => {
    UsersAPI.authenticate.mockResolvedValueOnce({ user: null, token: null });

    render(<App />);

    await waitFor(() => {
        expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
    // UsersAPI.authenticate request is resolved, but user is not logged in
    await waitFor(() => {
      expect(screen.getByTestId("welcome-page")).toBeInTheDocument();
    });
    expect(UsersAPI.authenticate).toHaveBeenCalledTimes(1);
  });

  it("renders home page when init success - user logged in", async () => {
    const mockUser = { id: 1, name: "Test User" };
    // user is authenticated successfully
    UsersAPI.authenticate.mockResolvedValueOnce({
      user: mockUser,
      token: "mockToken",
    });
    // wait until events and groups are fetched
    EventsAPI.getAll.mockResolvedValueOnce([]);
    GroupsAPI.getRecentPosts.mockResolvedValueOnce([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId("welcome-page")).not.toBeInTheDocument();
    });
    // display home page since api request is resolved with user and token
    await waitFor(() => {
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    });
    expect(UsersAPI.authenticate).toHaveBeenCalledTimes(1);
    expect(EventsAPI.getAll).toHaveBeenCalledTimes(1);
    expect(GroupsAPI.getRecentPosts).toHaveBeenCalledTimes(1);
    expect(BaseAPI.token).toBe("mockToken");
  });

  it("handle and display error on home page when failed to fetch data", async () => {
    const mockUser = { id: 1, name: "Test User" };
    // user is authenticated successfully
    UsersAPI.authenticate.mockResolvedValueOnce({
      user: mockUser,
      token: "mockToken",
    });
    // simulate events failed to fetch
    EventsAPI.getAll.mockRejectedValueOnce(new Error("Failed to fetch data"));
    GroupsAPI.getRecentPosts.mockResolvedValueOnce([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByTestId("welcome-page")).not.toBeInTheDocument();
    });
    // home page content is not rendered since it returns an inline error
    await waitFor(() => {
      expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
    });
    expect(UsersAPI.authenticate).toHaveBeenCalledTimes(1);
    expect(EventsAPI.getAll).toHaveBeenCalledTimes(1);
    expect(GroupsAPI.getRecentPosts).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
    expect(BaseAPI.token).toBe("mockToken");
  });
});
