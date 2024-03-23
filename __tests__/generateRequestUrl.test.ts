import { test, expect } from "vitest";
import { generateRequestUrl } from "../src/generateRequestUrl";

test("Should create request url with default options", () => {
  const requestUrl = generateRequestUrl();

  expect(requestUrl).toBe(
    "https://translate.google.com/_/TranslateWebserverUi/data/batchexecute?rpcids=MkEWBc&source-path=%2F&hl=en&soc-app=1&soc-platform=1&soc-device=1",
  );
});

test("Should throw an error for invalid tld", () => {
  expect(() => generateRequestUrl({ tld: "@localhost" })).toThrowError(/invalid tld/i);
  expect(() => generateRequestUrl({ tld: "123" })).toThrowError(/invalid tld/i);
  expect(() => generateRequestUrl({ tld: "a" })).toThrowError(/invalid tld/i);
  expect(() => generateRequestUrl({ tld: "com" })).not.toThrowError(/invalid tld/i);
});

test("Should be possible to change tld", () => {
  expect(generateRequestUrl()).toEqual(expect.stringContaining("translate.google.com"));
  expect(generateRequestUrl({ tld: "ua" })).toEqual(expect.stringContaining("translate.google.ua"));
  expect(generateRequestUrl({ tld: "it" })).toEqual(expect.stringContaining("translate.google.it"));
});

test("Should be possible to change hl", () => {
  expect(generateRequestUrl()).toEqual(expect.stringContaining("hl=en"));
  expect(generateRequestUrl({ hl: "it" })).toEqual(expect.stringContaining("hl=it"));
  expect(generateRequestUrl({ hl: "eu" })).toEqual(expect.stringContaining("hl=eu"));
});

test("Should be possible to change rpcids", () => {
  expect(generateRequestUrl()).toEqual(expect.stringContaining("rpcids=MkEWBc"));
  expect(generateRequestUrl({ rpcids: "TEST_rpsid" })).toEqual(expect.stringContaining("rpcids=TEST_rpsid"));
});
