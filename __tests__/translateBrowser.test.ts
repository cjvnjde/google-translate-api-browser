import { test, expect, vi } from "vitest";
import { translate } from "../src/translate.browser";

test("Should return correct value", async () => {
  const enToUa = `)]}'

617
[["wrb.fr","MkEWBc","[[null,null,null,[[[0,[[[null,9]],[true]]]],9],[[\\"What's up\\",null,null,9]],null,[\\"What's up\\",\\"en\\",\\"uk\\",true]],[[[null,\\"Yak spravy\\",null,true,null,[[\\"Як справи\\",null,null,null,[[\\"Як справи\\",[2],[]],[\\"Що там?\\",[5],[]],[\\"що там\\",[11],[]]]]],null,null,null,[]]],\\"uk\\",1,\\"en\\",[\\"What's up\\",\\"en\\",\\"uk\\",true]],\\"en\\",[\\"What's up?\\",null,null,null,null,[[[null,[[\\"Як справи?\\",null,[\\"How are you doing?\\",\\"How is it going?\\",\\"What's up?\\"],3,true]],\\"uk\\",\\"en\\",10]],1],null,null,\\"en\\",1]]",null,null,null,"generic"],["di",92],["af.httprm",92,"-7664958343595271062",23]]
25
[["e",4,null,null,687]]
`;

  vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: true, text: () => Promise.resolve(enToUa) }));

  await expect(translate("What's up")).resolves.toEqual(
    expect.objectContaining({
      text: "Як справи",
    }),
  );
});

test("Should throw an error for failed requests", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: false, text: () => Promise.resolve("Error") }));

  await expect(translate("What's up")).rejects.toThrowError(/request failed/i);
});

test("Should be possible to pass custom headers", async () => {
  const enToUa = `)]}'

617
[["wrb.fr","MkEWBc","[[null,null,null,[[[0,[[[null,9]],[true]]]],9],[[\\"What's up\\",null,null,9]],null,[\\"What's up\\",\\"en\\",\\"uk\\",true]],[[[null,\\"Yak spravy\\",null,true,null,[[\\"Як справи\\",null,null,null,[[\\"Як справи\\",[2],[]],[\\"Що там?\\",[5],[]],[\\"що там\\",[11],[]]]]],null,null,null,[]]],\\"uk\\",1,\\"en\\",[\\"What's up\\",\\"en\\",\\"uk\\",true]],\\"en\\",[\\"What's up?\\",null,null,null,null,[[[null,[[\\"Як справи?\\",null,[\\"How are you doing?\\",\\"How is it going?\\",\\"What's up?\\"],3,true]],\\"uk\\",\\"en\\",10]],1],null,null,\\"en\\",1]]",null,null,null,"generic"],["di",92],["af.httprm",92,"-7664958343595271062",23]]
25
[["e",4,null,null,687]]
`;

  vi.stubGlobal("fetch", vi.fn().mockResolvedValueOnce({ ok: true, text: () => Promise.resolve(enToUa) }));

  await translate("What's up", {
    headers: {
      "Custom-Header": "Custom-Value",
    },
  });

  expect(fetch).toHaveBeenCalledWith(
    expect.any(String),
    expect.objectContaining({
      headers: expect.objectContaining({
        "Content-Type": "application/x-www-form-urlencoded",
        "Custom-Header": "Custom-Value",
      }),
    }),
  );
});
