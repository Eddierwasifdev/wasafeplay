"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommandDemo } from "./command";
import { useState } from "react";

export function DialogDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);
  /*   const openDialog = () => setIsDialogOpen(true); */

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button className="border-[1px] w-48 rounded-lg ">Search...</Button>
      </DialogTrigger>

      <DialogTitle></DialogTitle>

      {/* Modal content */}
      <DialogContent className="p-0 overflow-hidden">
        <DialogClose asChild>
          {/* Pass the closeDialog function to CommandDemo */}
          <CommandDemo closeDialog={closeDialog} />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
