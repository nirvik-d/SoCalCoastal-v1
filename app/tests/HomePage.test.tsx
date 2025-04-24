import { describe, it, expect, beforeEach, vi } from "vitest";
import { DisplayHomePage } from "../pages/HomePage";
import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

describe("HomePage component", () => {
  it("renders content", async () => {
    const result = render(<DisplayHomePage />);
    await waitFor(() => expect(result).toBeDefined());
  });
});
