import { describe, it, expect, beforeEach, vi } from "vitest";
import { Community } from "../components/Community";
import { GenerateCommunityList } from "../components/CommunityList";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("GenerateCommunityList component", () => {
  it("renders content", async () => {
    const communities = [
      new Community({
        id: 1,
        name: "Test Community",
      }),
    ];
    const onSave = vi.fn();
    const result = render(
      <GenerateCommunityList communities={communities} onSave={onSave} />
    );
    await waitFor(() => expect(result).toBeDefined());
  });
});
