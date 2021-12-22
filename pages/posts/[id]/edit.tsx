import type { GetServerSideProps, NextPage } from "next";
import { useCallback, useState } from "react";

import { PostForm } from "../../../components/post-form";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";

type Fields = {
  title: string;
  content: string;
};

type PostEditProps = {
  id: string;
  fields: Fields;
};

export const getServerSideProps: GetServerSideProps<PostEditProps> = async (
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
      title: true,
      content: true,
    },
  });
  if (post === null) {
    return { notFound: true };
  }
  return {
    props: { fields: post, id },
  };
};

const PostEdit: NextPage<PostEditProps> = ({ id, fields }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState<Fields>(fields);
  const router = useRouter();

  const handleChange = useCallback(
    (name: "title" | "content", value: string) => {
      setPost((previous) => ({ ...previous, [name]: value }));
    },
    []
  );
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        const message = (await response.json()).message;
        throw new Error(message);
      }
      router.push(`/posts/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create post.");
    } finally {
      setLoading(false);
    }
  }, [id, post, router]);
  return (
    <div>
      Edit Post
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PostForm fields={post} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default PostEdit;
