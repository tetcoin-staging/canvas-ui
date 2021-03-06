// Copyright 2017-2021 @polkadot/react-query authors & contributors
// and @canvas-ui/react-query authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BareProps } from '@canvas-ui/react-api/types';
import { useApi, useCall } from '@canvas-ui/react-hooks';
import React from 'react';

import { DeriveCouncilVote } from '@polkadot/api-derive/types';
import { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';

import FormatBalance from '@canvas-ui/react-components/FormatBalance';

interface Props extends BareProps {
  children?: React.ReactNode;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function LockedVote ({ children, className = '', label, params }: Props): React.ReactElement<Props> | null {
  const { api } = useApi();
  const info = useCall<DeriveCouncilVote>(api.derive.council.votesOf, [params]);

  if (!info?.stake.gtn(0)) {
    return null;
  }

  return (
    <FormatBalance
      className={className}
      label={label}
      value={info?.stake}
    >
      {children}
    </FormatBalance>
  );
}

export default React.memo(LockedVote);
