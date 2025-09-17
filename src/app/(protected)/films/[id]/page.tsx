"use client"

import {useParams} from "next/navigation";
import {useFilmStore} from "@/store/form.store";
import {IFilm} from "@/types/film";
import {useEffect, useState} from "react";
import FilmForm from "@/forms/film.form";

const EditFilmPage = () => {
    const {id} = useParams<{id: string}>();
    const {films, isLoading, error} = useFilmStore()
    const [film, setFilm] = useState<IFilm | null>(null);
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    useEffect(() => {
        if (films.length >  0 || error) {
            const foundFilm = films.find((film) => film.id === id)
            setFilm(foundFilm || null)
            setHasSearched(true)
        }

    }, [films, id, error])

    if(isLoading) return <p className="text-center">Загрузка...</p>
    if(error) return <p className="text-red-500 text-center">{error}</p>;

    if(hasSearched && !film) {
        return <p className="text-red-500 text-center">Фильм не найден</p>
    }
    if (film) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">
                    Редактировать фильм: {film.name}
                </h1>
                <FilmForm initialFilm={film}/>
            </div>
        )
    }

    return <p className="text-center">Загрузка...</p>
}

export default EditFilmPage;