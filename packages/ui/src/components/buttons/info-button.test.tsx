import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";

import InfoButton from "./info-button";

test("Button should be rendered", () => {
  render(<InfoButton toggle={() => {}} label="Hello" />);

  expect(screen.getByText(/Hello/)).toBeInTheDocument();
});
