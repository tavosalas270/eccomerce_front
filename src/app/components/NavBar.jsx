"use client"
import React from 'react'
import Link from 'next/link';
import { usePathname, useRouter  } from 'next/navigation';
import Cookies from 'js-cookie';
import { postLogout } from '@/models/login';
import { Navbar, NavbarContent, NavbarItem, Button, Modal, ModalContent, ModalHeader, ModalFooter, useDisclosure } from "@nextui-org/react";

function NavBar() {
  
  const config = {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get("token")
    }
  }

  const router = useRouter()
  const pathname = usePathname();
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleCloseSession = () => {
    const user = JSON.parse(Cookies.get("user"))
    const data = {
      "user": user.email,
    }
    postLogout(data, config).then((response) => {
      Cookies.remove("user")
      Cookies.remove("token")
      Cookies.remove("refresh_token")
      router.push('/login')
      onClose()
    }).catch((error) => {})
  }

  return (
    <>
      <Navbar className='bg-neutral-300 justify-end h-0.5/5'>
        <NavbarContent justify="end">
          {pathname === '/' ? null : (
            <>
              {pathname.includes('/login') ? (
                <>
                  <NavbarItem>
                    <Button as={Link} isDisabled={pathname.includes('/login')} className={`${pathname.includes('/login') ? "bg-transparent border-4 border-solid border-blue-400":"bg-blue-400"} font-semibold`} href="/login">LogIn</Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button as={Link} isDisabled={pathname.includes('/sign')} className={`${pathname.includes('/sign') ? "bg-transparent border-4 border-solid border-blue-400":"bg-blue-400"} font-semibold`} href="#">Sign Up</Button>
                  </NavbarItem>
                </>
              ) : (
                <>
                  <NavbarItem>
                    <Button as={Link} isDisabled={pathname.includes('/main/dashboard')} className={`${pathname.includes('/main/dashboard') ? "bg-transparent border-4 border-solid border-green-400":"bg-green-400"} font-semibold`} href="/main/dashboard">Dashboard</Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button as={Link} isDisabled={pathname.includes('/main/control')} className={`${pathname.includes('/main/control') ? "bg-transparent border-4 border-solid border-green-400":"bg-green-400"} font-semibold`} href="/main/control" variant="flat">Control</Button>
                  </NavbarItem>
                  <NavbarItem>
                    <Button className="bg-red-400 font-semibold" onClick={() => onOpen()}>LogOut</Button>
                  </NavbarItem>
                </>
              )}
              
            </>
          )}
        </NavbarContent>
      </Navbar>
      <Modal size="lg" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">¿Seguro de cerrar sesión?</ModalHeader>
          <ModalFooter>
              <Button className='w-1/2 bg-red-400 font-semibold' onPress={onClose}>Cancelar</Button>
              <Button className='w-1/2 bg-blue-400 font-semibold' onPress={() => handleCloseSession()}>Cerrar Sesión</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NavBar