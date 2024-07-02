import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Provider from "../../src/providers";
import AllRecentFiles from "../../src/ui/AllRecentFiles";

describe("AllRecentFiles", () => {
  it("should display only heading ", () => {
    render(
      <Provider>
        <AllRecentFiles closeModal={vi.fn()} />
      </Provider>
    );

    const header = screen.getByText(/all recent/i);
    expect(header).toBeInTheDocument();
  });
});
