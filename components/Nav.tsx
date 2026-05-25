import { LogoLink } from "@/components/LogoMark";
import { CartButton } from "@/components/CartButton";
import { NavMenu } from "@/components/NavMenu";

export function Nav() {
  return (
    <header className="border-b border-linea/60 bg-papel sticky top-0 z-30">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <LogoLink className="h-7 w-auto md:h-9" />
        <NavMenu cartButton={<CartButton />} />
      </div>
    </header>
  );
}
