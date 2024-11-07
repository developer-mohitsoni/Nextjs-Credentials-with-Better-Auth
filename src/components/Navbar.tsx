import { AirVent } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="bg-gradient-to-r from-blue-200 via-teal-300 to-cyan-400 text-white shadow-lg">
      <div className="border-b border-transparent px-4">
        <div className="flex items-center justify-between mx-auto max-w-6xl h-16">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity duration-200"
          >
            <AirVent className="h-8 w-8 text-white" />
            <span className="font-bold text-2xl tracking-tight">
              nextsecure.
            </span>
          </Link>

          <div>
            {session ? (
              <form
                action={async () => {
                  "use server";
                  await auth.api.signOut({ headers: await headers() });
                  redirect("/");
                }}
                className="flex"
              >
                <Button
                  type="submit"
                  className="bg-white text-indigo-600 hover:bg-indigo-100 transition-all"
                >
                  Sign Out
                </Button>
              </form>
            ) : (
              <Link
                href="/sign-in"
                className={`${buttonVariants({
                  variant: "secondary",
                })}`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
