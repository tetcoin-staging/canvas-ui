// Copyright 2017-2021 @polkadot/app-config authors & contributors
// and @canvas-ui/app-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Option } from './types';

export default function create (t: <T= string> (key: string, text: string, options: { ns: string }) => T): Option[] {
  return [
    {
      text: t<string>('lng.detect', 'Default browser language (auto-detect)', { ns: 'app-config' }),
      value: 'default'
    },
    {
      text: 'English',
      value: 'en'
    },
    {
      text: '汉语',
      value: 'zh'
    },
    {
      text: 'русский',
      value: 'ru'
    },
    {
      text: '日本語',
      value: 'ja'
    }
  ];
}
