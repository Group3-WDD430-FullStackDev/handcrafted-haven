import Image from "next/image";
import { IUserProfileData } from "@/typing/IUser";

export default function UserProfilePic({ user }: { user: IUserProfileData }) {
  const getInitials = (fullName: string) => {
    const nameParts = fullName.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials;
  };
  return (
    <>
      {user?.image ? (
        <Image
          className="w-8 h-8 rounded-full"
          src={user.image}
          alt="User Photo"
          width={40}
          height={40}
        />
      ) : (
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-white rounded-full dark:bg-gray-600">
          <span className="font-medium text-foreground dark:text-background">
            {user?.displayName ? getInitials(user.displayName) : "NA"}
          </span>
        </div>
      )}
    </>
  );
}
