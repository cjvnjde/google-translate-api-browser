import { test, expect } from "vitest";
import { createRequestBody } from "../src/createRequestBody";

test("Should create request body for specific text input with default options", () => {
  const result = createRequestBody("test");

  expect(decodeURIComponent(result)).toBe('f.req=[[["MkEWBc","[[\\"test\\",\\"auto\\",\\"en\\",1],[]]",null,"generic"]]]&');
});

test("Should create request body for specific text input with custom options", () => {
  const result = createRequestBody("test", {
    rpcids: "TEST_rpc",
    from: "de",
    to: "gu",
  });

  expect(decodeURIComponent(result)).toBe('f.req=[[["TEST_rpc","[[\\"test\\",\\"de\\",\\"gu\\",1],[]]",null,"generic"]]]&');
});
