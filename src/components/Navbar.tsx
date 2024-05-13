"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { User } from "next-auth";
import { ModeToggle } from "./ModeToggle";

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
         <ModeToggle/> Whispered Context
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome{" "}
              <span
                style={{
                  border: "2px solid #4CAF50", // Change the color code as per your preference
                  padding: "5px 10px",
                  borderRadius: "5px",
                  color: "#4CAF50", // Same color as the border for text
                }}
              >
                {user?.username || user?.email}
              </span>{" "}
              to the Whisper Wire
            </span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
