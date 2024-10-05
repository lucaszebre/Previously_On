"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { removeFriend } from "@/actions/removeFriend";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function RemoveFriend() {
  const [username, setUsername] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [friendId, setFriendId] = useState<number | null>(null);

  const searchFriend = async (username: string) => {
    try {
      const response = await axios.get(
        `https://api.betaseries.com/members/search?login=${username}`,
        {
          headers: {
            "X-BetaSeries-Key":
              process.env.NEXT_PUBLIC_BETASERIES_KEY || "default_key",
          },
        }
      );
      if (
        response.data &&
        response.data.users &&
        response.data.users.length > 0
      ) {
        const friend = response.data.users[0];
        return friend.id;
      }
      return null;
    } catch (error) {
      console.error("Error searching friend:", error);
      return null;
    }
  };

  const removeFriendMutation = useMutation({
    mutationFn: async (friendId: number) => {
      await removeFriend(friendId);
    },
    onSuccess: () => {
      alert("Friend removed successfully!");
    },
    onError: () => {
      alert("Failed to remove friend.");
    },
  });

  const handleSearchAndRemoveFriend = async () => {
    const id = await searchFriend(username);
    if (id) {
      setFriendId(id);
      removeFriendMutation.mutate(id);
    } else {
      alert("Friend not found.");
    }
  };

  return (
    <div className="flex gap-4">
      <Input
        type="text"
        placeholder="Enter friend's username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 h-full border border-gray-300 rounded"
      />
      <Button
        onClick={handleSearchAndRemoveFriend}
        className="bg-red-500 h-full text-white p-2 rounded"
      >
        Remove Friend
      </Button>
    </div>
  );
}
