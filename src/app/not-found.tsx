import Link from "next/link"
import { Link as LinkIcon } from "lucide-react";


export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center pb-40 text-xl from-neutral-950">
      404 - Not Found :( <br /> The page you are looking for does not exist.
      <Link className="ml-2 text-blue-500 hover:underline" href="/"><LinkIcon className="inline mr-1" size={16} /></Link>
      
    </div>
  );
}
