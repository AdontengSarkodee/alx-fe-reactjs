
import { useQuery } from 'react-query';

const fetchPosts = async () =>
  fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());

export default function PostsComponent() {
  const { data, isLoading, refetch } = useQuery('posts', fetchPosts);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      {data.slice(0,5).map(p => <p key={p.id}>{p.title}</p>)}
    </div>
  );
}
