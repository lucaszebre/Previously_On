/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import betaseries from "@api/betaseries";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
process.env;
export const auth = async () => {
  const cookieStore = cookies();
  betaseries.auth(process.env.NEXT_PUBLIC_BETASERIES_KEY as string);
  const data = (await betaseries.postMembersOauth({
    client_id: process.env.NEXT_PUBLIC_BETASERIES_KEY,
  })) as any;

  cookieStore.set("redirect_uri", process.env.NEXT_PUBLIC_URL as string);
  cookieStore.set(
    "client_id",
    process.env.NEXT_PUBLIC_BETASERIES_KEY as string
  );
  cookieStore.set(
    "client_secret",
    process.env.NEXT_PUBLIC_BETASERIES_CLIENT_SECRET as string
  );

  redirect(
    `${data.data.oauth.callback}?redirect_uri=${process.env.NEXT_PUBLIC_URL}&&client_id=${process.env.NEXT_PUBLIC_BETASERIES_KEY}`
  );
};
