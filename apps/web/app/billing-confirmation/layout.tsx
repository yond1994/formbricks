import { PosthogClientWrapper } from "../PosthogClient";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return <PosthogClientWrapper>{children}</PosthogClientWrapper>;
}
