import { auth } from "@/services/auth";
import { SignOutForm } from "./_components/signout-form";

export default async function Home() {
  const session = await auth()

  return (
    <SignOutForm user={session?.user} />
  );
}
