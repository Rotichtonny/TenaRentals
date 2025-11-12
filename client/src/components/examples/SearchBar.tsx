import SearchBar from "../SearchBar";
import { useState } from "react";

export default function SearchBarExample() {
  const [value, setValue] = useState("");
  
  return (
    <div className="p-4">
      <SearchBar
        value={value}
        onChange={setValue}
        onFilterClick={() => console.log("Filter clicked")}
      />
    </div>
  );
}
