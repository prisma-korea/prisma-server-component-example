/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense} from 'react';
import Spinner from './Spinner';
import {prisma} from '../db.server';
import {PostListElement} from './PostListElement.client';
import {Layout} from './Layout.client';

export default function PostList() {
  /** @type import('@prisma/client').Post[] */
  const posts = prisma.post.findMany();
  return (
    <Layout>
      <h3>Post List</h3>
      <Suspense fallback={<Spinner />}>
        {posts.length === 0 ? (
          <p>There's no post yet!</p>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <PostListElement id={post.id} title={post.title} />
              </li>
            ))}
          </ul>
        )}
      </Suspense>
    </Layout>
  );
}
