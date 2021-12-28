import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCacheInvalidate} from '../cache.client';
import Spinner from './Spinner';
import {Layout} from './Layout.client';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const invalidateCache = useCacheInvalidate();
  const [isLoading, createPost] = useMutation({
    endpoint: '/api/posts',
    method: 'POST',
  });

  /** @type React.FormEventHandler */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({title, content});
    invalidateCache('/posts');
    navigate('/posts');
  };

  return (
    <Layout>
      <form className="post-form" onSubmit={handleSubmit}>
        <h3>Create New Post</h3>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <input disabled={isLoading} type="submit" value="Create" />
        {isLoading && <Spinner />}
      </form>
    </Layout>
  );
}

function useMutation({endpoint, method}) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [didError, setDidError] = useState(false);

  if (didError) {
    // Let the nearest error boundary handle errors while saving.
    throw error;
  }

  async function performMutation(payload) {
    setLoading(true);
    setError();
    setDidError(false);
    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
    } catch (e) {
      setDidError(true);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return [isLoading, performMutation];
}
