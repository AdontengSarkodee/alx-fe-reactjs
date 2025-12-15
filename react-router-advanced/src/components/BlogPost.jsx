// src/components/BlogPost.jsx
import { useParams } from "react-router-dom";

export default function BlogPost() {
  const { postId } = useParams();

  return (
    <div className="p-6">
      <h1>Blog Post #{postId}</h1>
      <p>This content is dynamically loaded based on the URL.</p>
    </div>
  );
}
