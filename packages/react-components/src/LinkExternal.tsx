// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import linked from '@canvas-ui/app-config/links';
import { LinkTypes } from '@canvas-ui/app-config/links/types';
import { useApi } from '@canvas-ui/react-hooks';
import BN from 'bn.js';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import Tooltip from './Tooltip';
import { useTranslation } from './translate';

interface Props {
  className?: string;
  data: BN | number | string;
  hash?: string;
  type: LinkTypes;
  withShort?: boolean;
}

function shortName (name: string): string {
  return `${name[0]}${name[name.length - 1]}`;
}

function genLinks (systemChain: string, { data, hash, type, withShort }: Props): React.ReactNode[] {
  return Object
    .entries(linked)
    .map(([name, { chains, create, isActive, paths, url }]): React.ReactNode | null => {
      const extChain = chains[systemChain];
      const extPath = paths[type];

      if (!isActive || !extChain || !extPath) {
        return null;
      }

      const trigger = `${name}-${type}-${data.toString()}`;
      const link = create(extChain, extPath, data, hash);

      return (
        <a
          data-for={trigger}
          data-tip={true}
          href={link}
          key={name}
          rel='noopener noreferrer'
          target='_blank'
        >
          {withShort
            ? shortName(name)
            : name
          }
          <Tooltip
            place='top'
            text={<>{name}<br />{url}</>}
            trigger={trigger}
          />
        </a>
      );
    })
    .filter((node): node is React.ReactNode => !!node);
}

function LinkExternal ({ className = '', data, hash, type, withShort }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { systemChain } = useApi();
  const links = useMemo(
    () => genLinks(systemChain, { data, hash, type, withShort }),
    [systemChain, data, hash, type, withShort]
  );

  if (!links.length) {
    return null;
  }

  return (
    <div className={`${className} ${withShort ? 'withShort' : ''}`}>
      {!withShort && <div>{t<string>('View this externally')}</div>}
      <div className='links'>{links.map((link, index) => <span key={index}>{link}</span>)}</div>
    </div>
  );
}

export default React.memo(styled(LinkExternal)`
  text-align: right;

  .links {
    span {
      word-wrap: normal;
      display: inline-block;
    }

    span+span {
      margin-left: 0.3rem;
    }
  }
`);
