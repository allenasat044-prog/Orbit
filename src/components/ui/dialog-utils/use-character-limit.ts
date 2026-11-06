import { useState, type ChangeEvent } from "react";

type Options = { maxLength: number; initialValue?: string };

/** Keeps a text value under a maximum length and reports how many characters are used. */
export function useCharacterLimit({ maxLength, initialValue = "" }: Options) {
  const [value, setValue] = useState(initialValue);
  const [characterCount, setCharacterCount] = useState(initialValue.length);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (next.length <= maxLength) {
      setValue(next);
      setCharacterCount(next.length);
    }
  };

  return { value, characterCount, handleChange, maxLength };
}
