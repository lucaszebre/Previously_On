"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function addFriend(friendId: number) {
  try {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get("access_token")?.value;

    if (access_token) {
      await axios.post(
        "https://api.betaseries.com/friends/friend",
        { id: friendId },
        {
          headers: {
            "X-BetaSeries-Key":
              process.env.NEXT_PUBLIC_BETASERIES_KEY || "default_key",
            "X-BetaSeries-Token": access_token,
          },
        }
      );
    } else {
      redirect("/auth");
    }
  } catch (error) {
    console.error("Error while adding friend:", error);
    throw new Error("Unable to add friend.");
  }
}
