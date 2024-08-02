import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';
import { beforeAll, vi } from "vitest";

expect.extend(matchers);

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
})

afterEach(() => {
  cleanup();
});
