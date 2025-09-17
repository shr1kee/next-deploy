"use client"

import {useFilmStore} from "@/store/form.store";
import Link from "next/link";
import {Button} from "@heroui/react";
import FilmCard from "@/components/common/film-card";

export default function Home() {
  const {films, isLoading, error} = useFilmStore();
  return (
     <>
       <div className="flex w-full justify-center items-center mb-4">
        <Link href="/films/new">
            <Button color="primary">Добавить фильм</Button>
        </Link>
       </div>
         {error && <p className="text-red-500 mb-4">{error}</p>}

         {isLoading && <p>Загрузка...</p>}

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             {films.map(film => (
                 <FilmCard key={film.id} film={film}></FilmCard>
             ))}
         </div>
     </>
  );
}
