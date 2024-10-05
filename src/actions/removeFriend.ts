"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function removeFriend(friendId: number) {
  try {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get("access_token")?.value;

    if (access_token) {
      const response = await fetch(
        "https://api.betaseries.com/friends/friend",
        {
          method: "DELETE",
          headers: {
            "X-BetaSeries-Key":
              process.env.NEXT_PUBLIC_BETASERIES_KEY || "default_key",
            "X-BetaSeries-Token": access_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: friendId }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to remove friend.");
      }
    } else {
      redirect("/auth");
    }
  } catch (error) {
    console.error("Error while removing friend:", error);
    throw new Error("Unable to remove friend.");
  }
}
