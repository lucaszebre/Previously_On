"use client";
import { afterauth } from "@/actions/afterauth";
import { getSeries } from "@/actions/getSeries";
import AddSerie from "@/components/addSerie";
import SerieCard from "@/components/SerieCard";
import SearchBar from "@/components/SearchBar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddFriend from "@/components/AddFriend";
import FriendsList from "@/components/FriendsList";
import RemoveFriend from "@/components/RemoveFriend";

export default function Home() {
  const searchParams = useSearchParams();
  const search = searchParams.get("code");

  const allSerie = useQuery({
    queryFn: async () => {
      const data = await getSeries();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data as any;
    },
    queryKey: ["allserie"],
    enabled: true,
  });

  const AccessMutation = useMutation({
    mutationFn: async (code: string) => {
      const data = await afterauth(code);
      return data;
    },
  });

  // console.log(allSerie.data,'in the page.tsx')

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // Get the code from the autho2
  useEffect(() => {
    if (search) {
      AccessMutation.mutate(search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  if (allSerie.isLoading) {
    return (
      <div className="text-white w-full h-full text-center font-bold text-2xl">
        Loading...
      </div>
    );
  }

  const filteredSeries =
    allSerie.data && allSerie.data.shows
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        allSerie.data.shows.filter((series: any) =>
          series.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <div className="flex flex-col w-full gap-4 mb-4 mt-8">
      <div className="flex h-10 justify-between w-full">
        <h1 className="font-bold text-white text-2xl">My series</h1>
        <AddSerie />
        <AddFriend />
        <FriendsList />
        <RemoveFriend />
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
        {filteredSeries.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredSeries.map((movie: any) => (
            <SerieCard
              key={movie.id}
              image={movie.images.poster}
              title={movie.title}
              id={movie.id}
            />
          ))
        ) : (
          <div className="flex flex-row w-full justify-center items-center">
            <p className="text-white font-bold">No series found</p>
          </div>
        )}
      </div>
    </div>
  );
}
