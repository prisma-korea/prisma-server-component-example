/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {BrowserRouter} from 'react-router-dom';
import Spinner from './components/Spinner';

import {useServerResponse} from './cache.client';

export default function Root() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary FallbackComponent={Error}>
          <Content />
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
}

function Content() {
  const response = useServerResponse();
  return response.readRoot();
}

function Error({error}) {
  return (
    <div>
      <h1>Application Error</h1>
      <pre style={{whiteSpace: 'pre-wrap'}}>{error.stack}</pre>
    </div>
  );
}
