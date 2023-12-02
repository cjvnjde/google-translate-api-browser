import { test, expect } from "vitest";
import { normaliseResponse } from "../src/normaliseResponse";

test("Should throw an error for invalid data", () => {
  expect(() => normaliseResponse("")).toThrowError(/data is either empty or corrupted/i);
  expect(() => normaliseResponse("data")).toThrowError(/data is either empty or corrupted/i);
  expect(() => normaliseResponse('start"\\[content]"end"')).toThrowError(/data is either empty or corrupted/i);
});

test("Should parse data", () => {
  const enToUa = `)]}'

617
[["wrb.fr","MkEWBc","[[null,null,null,[[[0,[[[null,9]],[true]]]],9],[[\\"What's up\\",null,null,9]],null,[\\"What's up\\",\\"en\\",\\"uk\\",true]],[[[null,\\"Yak spravy\\",null,true,null,[[\\"Як справи\\",null,null,null,[[\\"Як справи\\",[2],[]],[\\"Що там?\\",[5],[]],[\\"що там\\",[11],[]]]]],null,null,null,[]]],\\"uk\\",1,\\"en\\",[\\"What's up\\",\\"en\\",\\"uk\\",true]],\\"en\\",[\\"What's up?\\",null,null,null,null,[[[null,[[\\"Як справи?\\",null,[\\"How are you doing?\\",\\"How is it going?\\",\\"What's up?\\"],3,true]],\\"uk\\",\\"en\\",10]],1],null,null,\\"en\\",1]]",null,null,null,"generic"],["di",92],["af.httprm",92,"-7664958343595271062",23]]
25
[["e",4,null,null,687]]
`;
  let result = normaliseResponse(enToUa);

  expect(result).toEqual(
    expect.objectContaining({
      text: "Як справи",
      pronunciation: "Yak spravy",
    }),
  );

  const uaToRu = `)]}'

434
[["wrb.fr","MkEWBc","[[\\"Yak spravy\\",null,null,[[[0,[[[null,9]],[true]]]],9],[[\\"Як справи\\",null,null,9]],null,[\\"Як справи\\",\\"uk\\",\\"ru\\",true]],[[[null,\\"Kak dela\\",null,null,null,[[\\"Как дела\\",null,null,null,[[\\"Как дела\\",[5],[]],[\\"Как обстоит дело\\",[11],[]]]]],null,null,null,[]]],\\"ru\\",1,\\"uk\\",[\\"Як справи\\",\\"uk\\",\\"ru\\",true]],\\"uk\\"]",null,null,null,"generic"],["di",38],["af.httprm",37,"-5501631622697227587",23]]
25
[["e",4,null,null,522]]
`;
  result = normaliseResponse(uaToRu);

  expect(result).toEqual(
    expect.objectContaining({
      text: "Как дела",
      pronunciation: "Kak dela",
    }),
  );
});

test("Should pass raw data", () => {
  const uaToRu = `)]}'

434
[["wrb.fr","MkEWBc","[[\\"Yak spravy\\",null,null,[[[0,[[[null,9]],[true]]]],9],[[\\"Як справи\\",null,null,9]],null,[\\"Як справи\\",\\"uk\\",\\"ru\\",true]],[[[null,\\"Kak dela\\",null,null,null,[[\\"Как дела\\",null,null,null,[[\\"Как дела\\",[5],[]],[\\"Как обстоит дело\\",[11],[]]]]],null,null,null,[]]],\\"ru\\",1,\\"uk\\",[\\"Як справи\\",\\"uk\\",\\"ru\\",true]],\\"uk\\"]",null,null,null,"generic"],["di",38],["af.httprm",37,"-5501631622697227587",23]]
25
[["e",4,null,null,522]]
`;
  let result = normaliseResponse(uaToRu, false);

  expect(result).toEqual(
    expect.not.objectContaining({
      raw: expect.anything(),
    }),
  );

  result = normaliseResponse(uaToRu, true);

  expect(result).toEqual(
    expect.objectContaining({
      raw: expect.anything(),
    }),
  );
});
