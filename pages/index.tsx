import Link from "next/link";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div>
      Home
      <ul>
        <li>
          <Link href="/list">
            <a>Post List</a>
          </Link>
        </li>
        <li>
          <Link href="/new">
            <a>New Post</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
