import ky from 'ky';

import { config } from '../config';

export const api = ky.create({
  prefixUrl: config.EXPO_PUBLIC_API_URL,
  hooks: {},
});
