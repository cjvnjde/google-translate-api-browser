import { test, expect } from "vitest";
import { isLanguageSupported } from "../src/isLanguageSupported";

test("Should check language code", () => {
  expect(isLanguageSupported("en")).toBeTruthy();
  expect(isLanguageSupported("ru")).toBeTruthy();
  expect(isLanguageSupported("uk")).toBeTruthy();
  expect(isLanguageSupported("test" as any)).toBeFalsy();
})
