import { debounce } from "lodash";
import { Input } from "@airtable/blocks/ui";
import React, { useState, useCallback } from "react";

export default function SearchBar({ setSearchQuery }) {
    const [value, setValue] = useState("");
    const delayedQuery = useCallback(debounce(q => {
        setSearchQuery(q);
        console.log(q);
    }, 500), []);

    const handleChange = (e) => {
        const text = e.target.value;
        setValue(text);
        delayedQuery(text.toLowerCase());
    }

    return (
        <Input
            value={value}
            onChange={handleChange}
            placeholder="Search sermon by ID or name"
        />  
    );
}
