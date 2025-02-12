"use client"; // Assurez-vous d'utiliser le mode client pour gérer l'état

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // Icônes pour le menu burger

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navigation principale */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo_en.png"
                alt="Logo Quran"
                width={40}
                height={40}
                className="w-auto h-8"
              />
              <span className="ml-2 text-xl font-semibold text-green-700">Islam</span>
            </Link>

            {/* Liens (Desktop) */}
            <div className="hidden sm:flex sm:space-x-8">
              <Link href="/quran" className="text-gray-700 hover:text-green-600">
                Le Saint Coran
              </Link>
              <Link href="/names" className="text-gray-700 hover:text-green-600">
                Les 99 Noms d'Allah
              </Link>
              <Link href="/prayer-times" className="text-gray-700 hover:text-green-600">
                Horaires des Prières
              </Link>
            </div>

            {/* Menu burger (Mobile) */}
            <button
              className="sm:hidden text-gray-700"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar pour le menu mobile */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-green-700">Menu</h2>
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-gray-700" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link href="/" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
            Accueil
          </Link>
          <Link href="/quran" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
            Le Saint Coran
          </Link>
          <Link href="/names" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
            Les 99 Noms d'Allah
          </Link>
          <Link href="/prayer-times" className="text-gray-700 hover:text-green-600" onClick={() => setIsOpen(false)}>
            Horaires des Prières
          </Link>
        </div>
      </div>

      {/* Overlay pour fermer le menu en cliquant à l'extérieur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
