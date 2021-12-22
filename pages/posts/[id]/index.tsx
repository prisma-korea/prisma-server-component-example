import { GetServerSideProps, NextPage } from "next";

import Link from "next/link";
import { PrismaClient } from "@prisma/client";

type PostProps = {
  id: string;
  title: string;
  content: string;
};

export const getServerSideProps: GetServerSideProps<PostProps> = async (
  context
) => {
  const id = context.params?.id;

  if (typeof id !== "string") {
    return { notFound: true };
  }

  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });

  if (post === null) {
    return { notFound: true };
  }

  return { props: post };
};

const Post: NextPage<PostProps> = ({ id, title, content }) => {
  return (
    <div>
      <h1>{title}</h1>
      <Link href={`./${id}/edit`}>
        <a>edit</a>
      </Link>
      <p>{content}</p>
    </div>
  );
};

export default Post;
