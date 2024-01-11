import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/constant";
import Button from "./Button";
import { UserButton, auth } from "@clerk/nextjs";

const Navbar = async () => {
  const { userId } = auth();
  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" width={116} height={43} alt="logo" />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.text}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        <>
          <div className="flex flex-row gap-2">
            {userId ? (
              <>
                <Button title="Share work" />
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <Link
                  href="sign-in"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Sign In
                </Link>

                <Link
                  href="sign-up"
                  className="text-gray-300 hover:text-white mr-4"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
