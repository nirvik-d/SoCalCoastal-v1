import { describe, it, expect, beforeEach, vi } from "vitest";
import { Community } from "../components/Community";
import { DisplayCommunityCard } from "../components/CommunityCard";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("DisplayCommunityCard component", () => {
  it("renders content", async () => {
    const mockCommunity = new Community({
      id: 1,
      name: "Test Community",
    });
    const onEdit = vi.fn();
    const result = render(
      <DisplayCommunityCard onEdit={onEdit} community={mockCommunity} />
    );
    await waitFor(() => expect(result).toBeDefined());
  });
});
