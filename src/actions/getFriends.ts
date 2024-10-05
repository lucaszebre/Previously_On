"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getFriends() {
  try {
    const cookiesStore = cookies();
    const access_token = cookiesStore.get("access_token")?.value;

    if (access_token) {
      const response = await fetch("https://api.betaseries.com/friends/list", {
        method: "GET",
        headers: {
          "X-BetaSeries-Key":
            process.env.NEXT_PUBLIC_BETASERIES_KEY || "default_key",
          "X-BetaSeries-Token": access_token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch friends list.");
      }

      const data = await response.json();
      return data.users;
    } else {
      redirect("/auth");
    }
  } catch (error) {
    console.error("Error while fetching friends:", error);
    throw new Error("Unable to fetch friends.");
  }
}
