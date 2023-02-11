import { generateRequestUrl } from './generateRequestUrl';
import { isSupported } from './languages';
import { normaliseResponse } from './normaliseResponse';
import { translate } from './translate.server';

export {
  isSupported,
  translate,
  normaliseResponse,
  generateRequestUrl,
};

export default translate;
