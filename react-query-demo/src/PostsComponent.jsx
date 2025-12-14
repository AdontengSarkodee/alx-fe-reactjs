
import { useQuery } from 'react-query';

const fetchPosts = async () =>
  fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());

export default function PostsComponent() {
  const { data, isLoading, error, refetch } = useQuery('posts', fetchPosts);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      {data.slice(0,10).map(p => <p key={p.id}>{p.title}</p>)}
    </div>
  );
}
