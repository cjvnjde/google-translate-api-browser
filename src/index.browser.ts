import { generateRequestUrl } from "./generateRequestUrl";
import { isSupported } from "./languages";
import { normaliseResponse } from "./normaliseResponse";
import { translate } from "./translate.browser";
import { createRequestBody } from "./createRequestBody";

export { isSupported, translate, normaliseResponse, generateRequestUrl, createRequestBody };

export default translate;
