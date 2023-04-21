import { PosthogClient } from "../PosthogClient";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PosthogClient />
      {children}
    </>
  );
}
