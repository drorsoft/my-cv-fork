import React, { act } from "react";
import { describe, expect, test, afterEach } from "vitest";
import { createRoot } from "react-dom/client";
import { Header } from "../../src/components/Header";

describe("Header component", () => {
  let container: HTMLDivElement;

  function setup() {
    container = document.createElement("div");
    document.body.appendChild(container);
  }

  function teardown() {
    document.body.removeChild(container);
  }

  afterEach(teardown);

  test("renders name and title", () => {
    setup();
    const root = createRoot(container);
    act(() => {
      root.render(<Header name="John Doe" title="Software Engineer" />);
    });
    expect(container.querySelector("h1")?.textContent).toBe("John Doe");
    expect(container.querySelector("p")?.textContent).toBe("Software Engineer");
    act(() => {
      root.unmount();
    });
  });

  test("renders default avatar when no imageUrl provided", () => {
    setup();
    const root = createRoot(container);
    act(() => {
      root.render(<Header name="Jane" title="Developer" />);
    });
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("/placeholder-avatar.svg");
    expect(img?.getAttribute("alt")).toBe("Jane");
    act(() => {
      root.unmount();
    });
  });

  test("renders provided imageUrl", () => {
    setup();
    const root = createRoot(container);
    act(() => {
      root.render(<Header name="Jane" title="Developer" imageUrl="/photo.jpg" />);
    });
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("/photo.jpg");
    act(() => {
      root.unmount();
    });
  });
});
