/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Layout} from './Layout.client';

export default function Home() {
  return (
    <Layout>
      <h3>React Server Component + Prisma + React Router</h3>
      <p>
        This example shows how React server components can be used with Prisma
        and React Router.
      </p>
    </Layout>
  );
}
