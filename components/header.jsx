import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { ChevronDown, LayoutDashboard, StarsIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

const Header = () => {
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background'>

        <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <Link href='/'>
                <Image 
                    src='/logo.png' alt='Cluster AI Logo' width={200} height={60} 
                        className='h-12 py-1 w-auto object-contain'
                    />
            </Link>

            <div>
                <SignedIn>
                    <Link href={'/dashboard'}>
                        <Button>
                            <LayoutDashboard className='h-4 w-4 ' />
                            <span className='hidden md:block'>Industry Insights</span>
                        </Button>
                    </Link>
                </SignedIn>  

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <StarsIcon className='h-4 w-4 ' />
                            <span className='hidden md:block'>Industry Insights</span>
                            <ChevronDown className='h-4 w-4 ' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>          
            </div>
        </nav>

        <SignedOut>
            <SignInButton />
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </header>
  )
}

export default Header