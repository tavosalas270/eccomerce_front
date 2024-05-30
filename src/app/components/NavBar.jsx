"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname  } from 'next/navigation';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@nextui-org/react";

function NavBar() {
    const pathname = usePathname();
  return (
    <Navbar className='bg-neutral-300 justify-end h-0.5/5'>
      <NavbarContent justify="end">
        {!pathname.includes('/login') && (
          <NavbarItem>
            <Link href="/login">Login</Link>
          </NavbarItem>
        )}

        {pathname.includes('/main') && (
          <>
            <NavbarItem>
              <Link href="/main/dashboard">Dashboard</Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/main/control">Control</Link>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default NavBar