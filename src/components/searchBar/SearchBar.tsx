import { useState } from "react";
import { Input } from "../ui/input";

type Props = {};

const SearchBar = (props: Props) => {
  const [search, setSearch] = useState("");
  console.log("🚀 ~ SearchBar ~ setSearch:", search);
  const handleChange = (e: any) => {
    // setTodo({ ...todo, name: e.target.value });
    const searchValue = e.target.value;
    setSearch(searchValue);
  };
  return (
    <>
      <Input
        className="bg-white w-full"
        placeholder="Search Task "
        onChange={handleChange}
      />
      <h1 className="text-white"> {search}</h1>
    </>
  );
};

export default SearchBar;
