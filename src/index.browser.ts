import { generateRequestUrl } from "./generateRequestUrl";
import { isLanguageSupported } from "./isLanguageSupported";
import { normaliseResponse } from "./normaliseResponse";
import { translate } from "./translate.browser";
import { createRequestBody } from "./createRequestBody";

export { isLanguageSupported, translate, normaliseResponse, generateRequestUrl, createRequestBody };

export default translate;
