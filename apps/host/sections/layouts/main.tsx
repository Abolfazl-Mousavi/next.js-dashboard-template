// routes
import { usePathname } from "@repo/utils/routes/hooks";

import { cn } from "@repo/ui/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}
    >
      <div className="relative flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}
