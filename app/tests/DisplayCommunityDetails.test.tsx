import { describe, it, expect, beforeEach, vi } from "vitest";
import { Community } from "../components/Community";
import { DisplayCommunityDetails } from "../components/CommunityDetails";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("DisplayCommunityDetails component", () => {
  it("renders content", async () => {
    const mockCommunity = new Community({
      id: 1,
      name: "Test Community",
    });
    const result = render(
      <DisplayCommunityDetails community={mockCommunity} />
    );
    await waitFor(() => expect(result).toBeDefined());
  });
});
