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

test("Should handle text with multiple phrases", () => {
  const enToRu = `)]}'

5519
[["wrb.fr","MkEWBc","[[null,null,null,[[[0,[[[null,116]],[true]]],[1,[[[null,117],[117,339]],[false,true]]],[2,[[[null,340],[340,462]],[false,true]]],[3,[[[null,463],[463,554]],[false,true]]],[4,[[[null,555],[555,671]],[false,true]]]],671],[[\\"One day you got yourself a cat since it is getting lonely staying alone in a somewhat medium sized luxury apartment.\\",null,null,116],[\\" \\",null,116,117],[\\"Since arriving to your place, your cat has got its eyes on your cool looking Roomba with Gundam like design and spend most of its time riding the Roomba, just sitting on top of it as the Roomba moves around your apartment.\\",null,117,339],[\\" \\",null,339,340],[\\"As for your relationship with this cat, you have not even given it a name yet although it was named Flux at the pet store.\\",null,340,462],[\\" \\",null,462,463],[\\"The cat seems to be wary of you and seems to be always on its guard and won't approach you.\\",null,463,554],[\\" \\",null,554,555],[\\"As the morning rises, you see the cat riding the Roomba which has a smart protocol to do cleaning at specific times.\\",null,555,671]],null,[\\"One day you got yourself a cat since it is getting lonely staying alone in a somewhat medium sized luxury apartment. Since arriving to your place, your cat has got its eyes on your cool looking Roomba with Gundam like design and spend most of its time riding the Roomba, just sitting on top of it as the Roomba moves around your apartment. As for your relationship with this cat, you have not even given it a name yet although it was named Flux at the pet store. The cat seems to be wary of you and seems to be always on its guard and won't approach you. As the morning rises, you see the cat riding the Roomba which has a smart protocol to do cleaning at specific times.\\",\\"en\\",\\"ru\\",true]],[[[null,\\"Odnazhdy vy zaveli sebe koshku, tak kak yey stanovitsya odinoko ostavat'sya odnoy v roskoshnoy kvartire srednego razmera. S momenta pribytiya k vam vasha koshka zametila vash kruto vyglyadyashchiy Roomba s dizaynom, napominayushchim Gundam, i provodit bol'shuyu chast' vremeni, katayas' na Roomba, prosto sidya na nem, poka Roomba peremeshchayetsya po vashey kvartire. Chto kasayetsya vashikh otnosheniy s etim kotom, to vy yeshche dazhe ne dali yemu imya, khotya v zoomagazine yego nazyvali Flyuks. Kazhetsya, chto koshka nastorozhenno otnositsya k vam, vsegda nastorozhe i ne priblizhayetsya k vam. Na rassvete vy vidite kota, katayushchegosya na Roomba, u kotorogo yest' umnyy protokol uborki v opredelennoye vremya.\\",null,null,null,[[\\"Однажды вы завели себе кошку, так как ей становится одиноко оставаться одной в роскошной квартире среднего размера.\\",null,null,null,[[\\"Однажды вы завели себе кошку, так как ей становится одиноко оставаться одной в роскошной квартире среднего размера.\\",[5],[]],[\\"Однажды вы завели себе кошку, потому что ей становится одиноко оставаться одной в роскошной квартире среднего размера.\\",[11],[]]]],[\\"С момента прибытия к вам ваша кошка заметила ваш круто выглядящий Roomba с дизайном, напоминающим Gundam, и проводит большую часть времени, катаясь на Roomba, просто сидя на нем, пока Roomba перемещается по вашей квартире.\\",null,true,null,[[\\"С момента прибытия к вам ваша кошка заметила ваш круто выглядящий Roomba с дизайном, напоминающим Gundam, и проводит большую часть времени, катаясь на Roomba, просто сидя на нем, пока Roomba перемещается по вашей квартире.\\",[5],[]],[\\"С момента прибытия к вам ваша кошка заметила ваш круто выглядящий Roomba с дизайном, похожим на Gundam, и большую часть времени проводит, катаясь на Roomba, просто сидя на нем, пока Roomba перемещается по вашей квартире.\\",[11],[]]]],[\\"Что касается ваших отношений с этим котом, то вы еще даже не дали ему имя, хотя в зоомагазине его называли Флюкс.\\",null,true,null,[[\\"Что касается ваших отношений с этим котом, то вы еще даже не дали ему имя, хотя в зоомагазине его называли Флюкс.\\",[5],[]],[\\"Что касается ваших отношений с этим котом, то вы пока даже не дали ему имя, хотя в зоомагазине его называли Флюкс.\\",[11],[]]]],[\\"Кажется, что кошка настороженно относится к вам, всегда настороже и не приближается к вам.\\",null,true,null,[[\\"Кажется, что кошка настороженно относится к вам, всегда настороже и не приближается к вам.\\",[5],[]],[\\"Кажется, что кошка опасается вас, всегда начеку и не приближается к вам.\\",[11],[]]]],[\\"На рассвете вы видите кота, катающегося на Roomba, у которого есть умный протокол уборки в определенное время.\\",null,true,null,[[\\"На рассвете вы видите кота, катающегося на Roomba, у которого есть умный протокол уборки в определенное время.\\",[5],[]],[\\"На рассвете вы видите кота, едущего на роботе Roomba, у которого есть умный протокол уборки в определенное время.\\",[11],[]]]]],null,null,null,[]]],\\"ru\\",1,\\"en\\",[\\"One day you got yourself a cat since it is getting lonely staying alone in a somewhat medium sized luxury apartment. Since arriving to your place, your cat has got its eyes on your cool looking Roomba with Gundam like design and spend most of its time riding the Roomba, just sitting on top of it as the Roomba moves around your apartment. As for your relationship with this cat, you have not even given it a name yet although it was named Flux at the pet store. The cat seems to be wary of you and seems to be always on its guard and won't approach you. As the morning rises, you see the cat riding the Roomba which has a smart protocol to do cleaning at specific times.\\",\\"en\\",\\"ru\\",true]],\\"en\\"]",null,null,null,"generic"]]
58
[["di",165],["af.httprm",164,"-6641469789343798008",24]]
26
[["e",4,null,null,7119]]
`;
  const result = normaliseResponse(enToRu);

  expect(result.text).toEqual(
    "Однажды вы завели себе кошку, так как ей становится одиноко оставаться одной в роскошной квартире среднего размера. С момента прибытия к вам ваша кошка заметила ваш круто выглядящий Roomba с дизайном, напоминающим Gundam, и проводит большую часть времени, катаясь на Roomba, просто сидя на нем, пока Roomba перемещается по вашей квартире. Что касается ваших отношений с этим котом, то вы еще даже не дали ему имя, хотя в зоомагазине его называли Флюкс. Кажется, что кошка настороженно относится к вам, всегда настороже и не приближается к вам. На рассвете вы видите кота, катающегося на Roomba, у которого есть умный протокол уборки в определенное время.",
  );
});
