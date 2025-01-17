"use client";
import React, { useState } from "react";
import { DialogDemo } from "./dialog-search";
import { Button } from "./ui/button";

const SearchBtn = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleButtonClick = () => {
    setIsDialogOpen(true); // Show the dialog when the button is clicked
  };
  return (
    <div>
      <Button
        className="border-[1px] w-96 rounded-lg"
        variant="secondary"
        onClick={handleButtonClick}
      >
        Search...
      </Button>
      {isDialogOpen && <DialogDemo />}
    </div>
  );
};

export default SearchBtn;
