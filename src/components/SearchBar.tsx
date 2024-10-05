"use client";
import { useState } from "react";
import { Input } from "./ui/input";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <Input
      type="text"
      placeholder="Rechercher une série..."
      value={searchTerm}
      onChange={handleSearch}
      className="mb-4 p-2 border border-gray-300 rounded"
    />
  );
}
