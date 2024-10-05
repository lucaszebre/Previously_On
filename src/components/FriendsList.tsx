import { useEffect, useState } from "react";
import { getFriends } from "@/actions/getFriends";

export default function FriendsList() {
  const [friends, setFriends] = useState<{ id: number; login: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const friendsList = await getFriends();
        setFriends(friendsList);
      } catch (err) {
        setError("Failed to load friends list.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Friends:</h1>
      {friends.length === 0 ? (
        <p>you have absolutely no friends</p>
      ) : (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>{friend.login}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
