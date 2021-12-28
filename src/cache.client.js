/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {unstable_getCacheForType} from 'react';
import {useLocation} from 'react-router-dom';
import {createFromFetch} from 'react-server-dom-webpack';

function createResponseCache() {
  return new Map();
}

export function useCacheInvalidate() {
  const cache = unstable_getCacheForType(createResponseCache);

  return (key) => {
    cache.delete(key);
  };
}

export function useServerResponse() {
  const {pathname} = useLocation();
  const cache = unstable_getCacheForType(createResponseCache);
  let response = cache.get(pathname);
  if (response) {
    return response;
  }
  response = createFromFetch(fetch(`/react${pathname}`));
  cache.set(pathname, response);
  return response;
}
