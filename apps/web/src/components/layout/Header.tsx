import Link from "next/link";
import { SearchInput } from "../SearchInput";

export function Header() {
  return (
    <header className="fixed top-0 w-full h-16 bg-white border-b z-50 px-4 flex items-center justify-between">
      {/* Лого */}
      <Link href="/" className="font-bold text-xl">🚀 CodeRoast</Link>
      
      {/* Поиск (расширяется при фокусе) */}
      <div className="flex-1 max-w-xl mx-4">
        <SearchInput />
      </div>
      
      {/* Правая часть */}
      <div className="flex items-center gap-3">
        <Link href="/new" className="btn-primary">➕ Create</Link>
        
        {/* <UserMenu user={{ name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://github.com/shadcn.png' }} /> Аватар + дропдаун */}
      </div>
    </header>
  );
}