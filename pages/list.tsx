import { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { PrismaClient } from "@prisma/client";

type PostListProps = {
  posts: {
    id: string;
    title: string;
    content: string;
  }[];
};

export const getServerSideProps: GetServerSideProps<PostListProps> =
  async () => {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
      },
    });

    return {
      props: { posts },
    };
  };

const PostList: NextPage<PostListProps> = ({ posts }) => {
  return (
    <div>
      Post List
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
