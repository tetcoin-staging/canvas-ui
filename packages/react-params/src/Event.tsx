// Copyright 2017-2021 @polkadot/react-components authors & contributors
// and @canvas-ui/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Params from './Param/Params';
import { classes } from '@canvas-ui/react-util';
import React from 'react';

import { getTypeDef } from '@polkadot/types';
import { Event } from '@polkadot/types/interfaces';
import { Codec, TypeDef } from '@polkadot/types/types';

import { BareProps } from '@canvas-ui/react-components/types';

export interface Props extends BareProps {
  children?: React.ReactNode;
  value: Event;
}

function EventDisplay ({ children, className = '', value }: Props): React.ReactElement<Props> {
  const params = value.typeDef.map(({ type }): { type: TypeDef } => ({
    type: getTypeDef(type)
  }));
  const values = value.data.map((value): { isValid: boolean; value: Codec } => ({
    isValid: true,
    value
  }));

  return (
    <div className={classes('ui--Event', className)}>
      {children}
      <Params
        isDisabled
        params={params}
        values={values}
      />
    </div>
  );
}

export default React.memo(EventDisplay);
