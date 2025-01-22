import { AlignLeft, Clapperboard, Home, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Movie",
    url: "/movie",
    icon: Clapperboard,
  },
  {
    title: "TV Show",
    url: "/tv",
    icon: Tv,
  },
];

export function AppSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent className="space-y-6">
        {items.map((item, index) => (
          <a
            href={item.url}
            key={index}
            className="flex items-center space-x-2 "
          >
            <item.icon />
            <span>{item.title}</span>
          </a>
        ))}
      </SheetContent>
    </Sheet>
  );
}
