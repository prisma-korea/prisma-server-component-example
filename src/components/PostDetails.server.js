import {Suspense} from 'react';
import Spinner from './Spinner';
import {prisma} from '../db.server';
import {Layout} from './Layout.client';

export default function PostDetails({id}) {
  /** @type import('@prisma/client').Post | null */
  const post = prisma.post.findUnique({where: {id}});

  if (!post) {
    return <div>Not Found</div>;
  }
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <h3>{post.title}</h3>
        <div>{post.content}</div>
      </Suspense>
    </Layout>
  );
}
