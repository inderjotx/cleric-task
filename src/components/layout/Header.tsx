import { useState, useEffect, useCallback } from "react";
import { X, ChevronDown, Menu } from "lucide-react";
import { useScrollDetection } from "@/components/hooks/scroll-detection";

// =============================================================================
// Types
// =============================================================================

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface BannerConfig {
  text: string;
  linkText: string;
  linkHref: string;
}

// =============================================================================
// Configuration
// =============================================================================

const SCROLL_THRESHOLD = 50;

const BANNER_CONFIG: BannerConfig = {
  text: "Cleric Named a Gartner® Cool Vendor 2025 in AI for SRE and Observability.",
  linkText: "Find out more",
  linkHref: "/",
};

const NAV_ITEMS: NavItem[] = [
  { label: "Product", href: "/", hasDropdown: false },
  { label: "Solutions", href: "/about", hasDropdown: true },
  { label: "Resources", href: "/", hasDropdown: true },
  { label: "About", href: "", hasDropdown: false },
  { label: "Careers", href: "/careers", hasDropdown: false },
];



interface BannerProps {
  config: BannerConfig;
  onClose: () => void;
}

function Banner({ config, onClose }: BannerProps) {
  return (
    <div className="bg-primary text-primary-foreground w-full px-2 py-px text-sm font-medium flex items-center min-h-8">
      <div className="w-10 shrink-0" />

      <div className="flex-1 text-sm flex items-center justify-center min-w-0">
        <span className="truncate">
          {config.text}
          <a href={config.linkHref} className="underline text-violet-400 whitespace-nowrap">
            {" "}
            {config.linkText}
          </a>
        </span>
      </div>

      <button
        onClick={onClose}
        className="shrink-0 ml-2 p-2 hover:opacity-70 transition-opacity"
        aria-label="Close banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

interface NavLinkProps {
  item: NavItem;
  isScrolled: boolean;
}

function NavLink({ item, isScrolled }: NavLinkProps) {
  const baseStyles = "flex items-center gap-2 text-[15px] font-medium leading-[1.4] hover:opacity-80 transition-opacity";
  const colorStyles = isScrolled ? "text-[#313131]" : "text-white";

  return (
    <a
      href={item.href}
      className={`${baseStyles} ${colorStyles}`}
      style={{ fontFeatureSettings: "'salt'" }}
    >
      {item.label}
      {item.hasDropdown && <ChevronDown className="w-[18px] h-[18px]" />}
    </a>
  );
}

interface RequestDemoButtonProps {
  isScrolled: boolean;
}

function RequestDemoButton({ isScrolled }: RequestDemoButtonProps) {
  const baseStyles = "px-4 py-1.5 rounded-full text-[15px] font-medium leading-[1.4] transition-colors";
  const variantStyles = isScrolled
    ? "bg-black text-white hover:bg-black/90"
    : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30";

  return (
    <button
      className={`${baseStyles} ${variantStyles}`}
      style={{ fontFeatureSettings: "'salt'" }}
    >
      Request Demo
    </button>
  );
}

interface MobileMenuButtonProps {
  isScrolled: boolean;
  onClick?: () => void;
}

function MobileMenuButton({ isScrolled, onClick }: MobileMenuButtonProps) {
  const iconColor = isScrolled ? "text-[#313131]" : "text-white";

  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 -mr-4"
      aria-label="Toggle menu"
    >
      <Menu className={`w-6 h-6 ${iconColor}`} />
    </button>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function Header() {
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const isScrolled = useScrollDetection();

  const handleBannerClose = useCallback(() => {
    setIsBannerVisible(false);
  }, []);

  const navbarStyles = isScrolled
    ? "bg-white/95 backdrop-blur-sm shadow-sm"
    : "bg-transparent";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Banner */}
      {isBannerVisible && (
        <Banner config={BANNER_CONFIG} onClose={handleBannerClose} />
      )}

      {/* Navigation Bar */}
      <nav className={`w-full transition-colors duration-300 ${navbarStyles}`}>
        <div className="max-w-[1600px] mx-auto  px-4 md:px-6 lg:px-20 py-2 md:py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src={isScrolled ? "/logo/cleric.svg" : "/logo/cleric-white.svg"}
              alt="Cleric"
              className="h-5 md:h-6 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.label} item={item} isScrolled={isScrolled} />
            ))}
            <RequestDemoButton isScrolled={isScrolled} />
          </div>

          {/* Mobile Menu Trigger */}
          <MobileMenuButton isScrolled={isScrolled} />
        </div>
      </nav>
    </header>
  );
}
