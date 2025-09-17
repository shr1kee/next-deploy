"use client";
import Image from "next/image";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Button} from "@heroui/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";
import RegistrationModal from "@/components/UI/modals/registration.modal";
import LoginModal from "@/components/UI/modals/login.modal";
import {useState} from "react";
import {signOutFunc} from "@/actions/sign-out";
import {useAuthStore} from "@/store/auth.store";

export const Logo = () => {
    return (
        <Image
            src="/logo.png"
            alt={siteConfig.title}
            width={26}
            height={26}
            priority
        />
    );
};

export default function Header() {
    const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const handleSignOut = async () => {
        try {
            await signOutFunc()
        } catch (error) {
            console.log("error", error)
        }

        setAuthState("unauthenticated", null)
    }
    const getNavItems = () => {
        return siteConfig.navItems
            .filter((item) => {
                if(item.href == "/actors") {
                    return isAuth;
                }
                return true;
            })
            .map(({href, label}) => {
            const isActive = pathname == href
            return (<NavbarItem key={href}>
                    <Link
                        color="foreground"
                        href={href}
                        className={`px-3 py-1
                        ${isActive ? "text-blue-500" : "text-foreground"}
                        hover: text-blue-300 hover:border
                        hover:border-blue-300 hover:rounded-md
                        transition-colors
                        transition-border
                        duration-200`}
                    >
                        {label}
                    </Link>
                </NavbarItem>
            )
        })
    }
    const pathname = usePathname();
    const {isAuth, session, status, setAuthState} = useAuthStore()

    return (
        <Navbar className={`h-[${layoutConfig.headerHeight}]`}>
            <NavbarBrand>
                <Link href="/next/public" className="flex gap-1">
                    <Logo/>
                    <p className="font-bold text-inherit">{siteConfig.title}</p>
                </Link>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>

            <NavbarContent justify="end">
                {isAuth && <p>Привет, {session?.user?.email}!</p>}
                {status == "loading" ? <p>Загрузка...</p> : !isAuth ? <>
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link}
                                    color="secondary"
                                    href="#"
                                    variant="flat"
                                    onPress={() => setIsLoginOpen(true)}>Логин</Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary"
                                    href="#"
                                    variant="flat"
                                    onPress={() => setIsRegistrationOpen(true)}
                            >
                                Регистрация
                            </Button>
                        </NavbarItem>
                    </> :
                    <NavbarItem className="hidden lg:flex">
                        <Button as={Link}
                                color="secondary"
                                href="#"
                                variant="flat"
                                onPress={handleSignOut}>Выйти</Button>
                    </NavbarItem>}
            </NavbarContent>
            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)}/>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
        </Navbar>
    );
}