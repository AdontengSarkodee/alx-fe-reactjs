import { useQuery } from "@tanstack/react-query";

export default function PostsComponent() {
  const fetchPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // REQUIRED by your assignment/test
    cacheTime: 1000 * 60 * 5,          // 5 minutes
    staleTime: 5000,                   // data is fresh for 5 seconds
    refetchOnWindowFocus: false,       // disable refetch on browser focus
    keepPreviousData: true,            // keep old data while fetching new

  });

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>

        <button
          onClick={() => refetch()}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Refetch Posts
        </button>

        {isFetching && (
          <span className="text-gray-500 text-sm">Updating...</span>
        )}
      </div>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="border p-3 rounded shadow-sm">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
