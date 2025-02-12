import { JSX } from "react";

export default function Footer(): JSX.Element {
  return (
    <div className="text-center py-2 mt-5 bg-handcraftedPink-300">
      &copy; Handcrafted Haven [WDD430 Team 3]
      <div className="flex flex-col md:flex-row justify-center">
        <span>- Alvaro Godoy -</span>
        <span>- Derek Christensen -</span>
        <span>- Heather Gibb -</span>
        <span>- Tiffany Voorhees -</span>
      </div>
    </div>
  );
}
