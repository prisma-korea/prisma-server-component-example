import {Link} from 'react-router-dom';
export const Layout = ({children}) => {
  return (
    <div className="fullscreen">
      <nav className="navbar">
        <span>Navigation</span>
        <Link to="/">Home</Link>
        <Link to="/posts">Post List</Link>
        <Link to="/new-post">New Post</Link>
      </nav>
      <div className="content">{children}</div>
    </div>
  );
};
