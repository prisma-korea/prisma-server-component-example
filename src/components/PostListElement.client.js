import {Link} from 'react-router-dom';
export const PostListElement = ({id, title}) => {
  return <Link to={`/posts/${id}`}>{title}</Link>;
};
