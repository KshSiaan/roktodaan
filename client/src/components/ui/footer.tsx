import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="font-open bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-2xl font-bold text-zinc-800 dark:text-zinc-200"
            >
              RoktoDaan
            </Link>
            <p className="mt-2 text-sm">Saving lives, one donation at a time</p>
          </div>
          <nav className="mb-6 md:mb-0 flex flex-wrap justify-center md:justify-end gap-6">
            <Link
              href="/about"
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              About
            </Link>
            <Link
              href="/donate"
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Donate
            </Link>
            <Link
              href="/locations"
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Locations
            </Link>
            <Link
              href="/contact"
              className="hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
            >
              Contact
            </Link>
          </nav>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
        <div className="py-4 border-t border-zinc-200 dark:border-zinc-800 text-sm text-center">
          © {new Date().getFullYear()} RoktoDaan. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
