"use client"

import FilmForm from "@/forms/film.form";

export default function NewFilmPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Добавить новый фильм</h1>
            <FilmForm/>
        </div>
    )
}