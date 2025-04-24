import { describe, it, expect, beforeEach, vi } from "vitest";
import { Community } from "../components/Community";
import { DisplayCommunityPage } from "../pages/CommunityPage";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

vi.mock("next/navigation", () => ({
  useParams: vi.fn().mockReturnValue({ id: 1 }),
  spy: true,
}));

vi.mock("../api/CommunityAPI", () => {
  const mockCommunity = new Community({
    id: 1,
    name: "Test Community",
    description: "A beautiful place to visit",
    image_url: "http://example.com/image.jpg",
    county: "Santa Barbara",
    is_visited: true,
  });

  return {
    CommunityAPI: {
      get: vi.fn().mockResolvedValue([mockCommunity]),

      put: vi.fn().mockResolvedValue(
        new Community({
          ...mockCommunity,
          name: "Updated Community",
        })
      ),

      find: vi.fn().mockResolvedValue(mockCommunity),
    },
  };
});

describe("DisplayCommunityPage component", () => {
  it("renders content", async () => {
    const result = render(<DisplayCommunityPage />);
    await waitFor(() => expect(result).toBeDefined());
  });
});
