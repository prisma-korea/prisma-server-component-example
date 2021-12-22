import React, { useCallback } from "react";

type PostFormProps = {
  fields: {
    title: string;
    content: string;
  };
  onChange: (name: "title" | "content", value: string) => void;
  onSubmit: () => void;
};

export const PostForm = ({
  fields,
  onChange,
  onSubmit,
}: PostFormProps): React.ReactElement => {
  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        onChange("title", e.target.value);
      },
      [onChange]
    );
  const handleContentChange: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback(
      (e) => {
        onChange("content", e.target.value);
      },
      [onChange]
    );
  const handleSubmit: React.FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit();
    },
    [onSubmit]
  );
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input
          name="title"
          type="text"
          value={fields.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        Content
        <textarea
          name="content"
          value={fields.content}
          onChange={handleContentChange}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};
