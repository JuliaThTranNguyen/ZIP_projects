import React, { useState, useRef, useEffect, useContext } from 'react';
import { HiHome, HiShoppingCart, HiSearch, HiUserCircle,HiMenu, HiX } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';
import logo from '../assets/logo.png';
import Image from 'next/image';
import { CartContext } from './CartContext';

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      searchInputRef.current &&
      !searchInputRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { cartProducts } = useContext(CartContext);

  return (
    <header className="bg-black text-white pt-5 py-4 px-8 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Image src={logo} width={60} height={60} alt="logo" className="rounded-lg" />
        
        <Link href="/">
                    <p className="hover:text-blue-500"><HiHome size={20} /></p>
                  </Link>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleDropdownClick}
            ref={dropdownRef}
          >
            <span>
              <HiMenu size={20} />
            </span>
            <IoIosArrowDown size={16} className="ml-1" />
          </div>
          {/* Dropdown menu for categories */}
          {showDropdown && (
            <div >
              <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setShowDropdown(false)}></div>
              <ul className="absolute bg-white text-black shadow-lg rounded-md m-5 p-5 w-40 z-20">
                {/* Add your categories here */}
                <li>
                  <Link href="/">
                    <p className="hover:text-blue-500">Home</p>
                  </Link>
                </li>
                <li>
                  <Link href="/products">
                    <p className="hover:text-blue-500">All Items</p>
                  </Link>
                </li>
                <li>
                  <Link href="/profile">
                    <p className="hover:text-blue-500">Account</p>
                  </Link>
                </li>
                <li>
                  <Link href="/cart">
                    <p className="hover:text-blue-500">Cart ({cartProducts.length})</p>
                  </Link>
                </li>
              </ul>
              <div className="absolute right-0 top-0 m-5 z-30">
                <HiX size={20} onClick={() => setShowDropdown(false)} />
              </div>
            </div>
          )}
        </div>

        {!showSearch && (
          <HiSearch size={20} onClick={handleSearchClick} className="cursor-pointer" />
        )}

        {showSearch && (
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-600 p-2 rounded hover:bg-gray-900"
              ref={searchInputRef}
            />
            <HiX
              size={20}
              className="absolute top-2 right-3 cursor-pointer hover:text-gray-500"
              onClick={() => setShowSearch(false)}
            />
          </div>
        )}

        <Link href="/profile">
          <HiUserCircle size={20} />
        </Link>
        <Link href="/cart" className="flex">
          <HiShoppingCart size={20} className="mr-1" />
          <p className="text-sm">({cartProducts.length})</p>
        </Link>
      </div>
    </header>
  );
}
