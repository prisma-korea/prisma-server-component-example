import { useCallback, useState } from "react";

import { NextPage } from "next";
import { PostForm } from "../components/post-form";
import { useRouter } from "next/router";

type Fields = {
  title: string;
  content: string;
};

const PostNew: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [post, setPost] = useState<Fields>({
    title: "",
    content: "",
  });
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
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        const message = (await response.json()).message;
        throw new Error(message);
      }
      router.push("/list");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create post.");
    } finally {
      setLoading(false);
    }
  }, [post, router]);
  return (
    <div>
      New Post
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <PostForm fields={post} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
};

export default PostNew;
