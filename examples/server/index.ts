import {translate} from '../../src/index.server.ts';

translate('помогите').then((data: any) => {
  console.log(data)
})
