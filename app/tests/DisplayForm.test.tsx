import { describe, it, expect, beforeEach, vi } from "vitest";
import { Community } from "../components/Community";
import { DisplayCommunityForm } from "../components/CommunityForm";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("DisplayForm component", () => {
  it("renders content", async () => {
    const onCancel = vi.fn();
    const onSave = vi.fn();
    const mockCommunity = new Community({
      id: 1,
      name: "Test Community",
    });
    const result = render(
      <DisplayCommunityForm
        onCancel={onCancel}
        onSave={onSave}
        community={mockCommunity}
      />
    );
    await waitFor(() => expect(result).toBeDefined());
  });
});
