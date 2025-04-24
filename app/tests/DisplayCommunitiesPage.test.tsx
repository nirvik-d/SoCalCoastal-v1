import { describe, it, expect, beforeEach, vi } from "vitest";
import { Community } from "../components/Community";
import {
  DisplayCommunitiesPage,
  loadCommunities,
  saveCommunity,
  sortCommunities,
} from "../pages/CommunitiesPage";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { CommunityAPI } from "../api/CommunityAPI";

vi.mock("../api/CommunityAPI", () => {
  const mockCommunity = new Community({
    id: 1,
    name: "Test Community",
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

describe("DisplayCommunitiesPage component", () => {
  it("sorts communities", async () => {
    const communities = [
      new Community({ id: 2, name: "Laguna Beach" }),
      new Community({ id: 1, name: "Crystal Cove" }),
    ];
    const result = sortCommunities(communities);
    await waitFor(
      () => (
        expect(result[0].name).toBe("Crystal Cove"),
        expect(result[1].name).toBe("Laguna Beach")
      )
    );
  });

  it("updates a community and sets new sorted communities", async () => {
    const mockSetCommunities = vi.fn();
    const mockSetError = vi.fn();

    const initial = [
      new Community({ id: 1, name: "Laguna Beach" }),
      new Community({ id: 2, name: "Crystal Cove" }),
    ];
    const updated = { id: 2, name: "Newport Beach" };

    (CommunityAPI.put as any).mockResolvedValue(updated);

    await saveCommunity(
      updated as Community,
      initial,
      mockSetCommunities,
      mockSetError
    );

    await waitFor(() =>
      expect(mockSetCommunities).toHaveBeenCalledWith([
        new Community({ id: 1, name: "Laguna Beach" }),
        new Community({ id: 2, name: "Newport Beach" }),
      ])
    );
  });

  it("loads and sets sorted communities", async () => {
    const mockSetError = vi.fn();
    const mockSetLoading = vi.fn();
    const mockSetCommunities = vi.fn();

    await loadCommunities(1, mockSetCommunities, mockSetError, mockSetLoading);

    await waitFor(
      () => (
        expect(mockSetLoading).toHaveBeenCalledWith(true),
        expect(mockSetLoading).toHaveBeenCalledWith(false)
      )
    );
  });

  it("renders content", async () => {
    const result = render(<DisplayCommunitiesPage />);
    await waitFor(() => expect(result).toBeDefined());
  });
});
