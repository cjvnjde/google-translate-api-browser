import { generateRequestUrl } from './generateRequestUrl';
import { isSupported } from './languages';
import { normaliseResponse } from './normaliseResponse';
import { translate, setCORS } from './translate';

export {
  isSupported,
  translate,
  normaliseResponse,
  generateRequestUrl,
  setCORS,
};

export default translate;
