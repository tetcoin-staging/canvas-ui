// Copyright 2017-2021 @polkadot/apps authors & contributors
// and @canvas-ui/app authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Redirect } from 'react-router';

function NotFound (): React.ReactElement {
  return (
    <Redirect to='/upload' />
  );
}

export default React.memo(NotFound);