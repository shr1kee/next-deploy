"use client";

import {useSession} from "next-auth/react";
import {useAuthStore} from "@/store/auth.store";
import {ReactNode, useEffect} from "react";
import {useActorStore} from "@/store/actors.store";
import {useFilmStore} from "@/store/form.store";

interface IProps {
    children: React.ReactNode;
}

const AppLoader = ({children}: IProps) => {
    const {data: session, status} = useSession()
    const { loadActors} = useActorStore()
    const {loadFilms} = useFilmStore()
    const {isAuth, setAuthState} = useAuthStore()
    useEffect(() => {
        setAuthState(status, session)
    }, [status, session, setAuthState])
    useEffect(() => {
        if (isAuth) {
            loadActors()
        }
    }, [isAuth, loadActors]);
    useEffect(() => {
        loadFilms()
    }, [loadActors]);
    return <>{children}</>
}

export default AppLoader;