import { Logo } from "@/components/Logo";
import { SiteNavigation } from "@/components/SiteNavigation";
import { TopBar } from "@/components/TopBar";

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-background shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
      <TopBar />
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:px-8 lg:gap-6 lg:px-10">
        <Logo compact />
        <div className="min-w-0 flex-1">
          <SiteNavigation />
        </div>
      </div>
    </header>
  );
};
