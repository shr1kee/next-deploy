"use client"

import {IFilm} from "@/types/film";
import {useFilmStore} from "@/store/form.store";
import {useTransition} from "react";
import {Button, Card, CardBody, CardHeader} from "@heroui/react";
import Image from "next/image"
import Link from "next/link";

interface FilmCardProps {
    film: IFilm;
}

const FilmCard = ({film}: FilmCardProps) => {
    const {removeFilm} = useFilmStore();
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            try {
                await removeFilm(film.id);
            } catch (error) {
                console.error(error);
            }
        })
    }
    return (
        <Card className="w-full max-w-md h-[480px] flex flex-col">
            <div className="h-48 overflow-hidden">
                {film.imageUrl ? (
                    <div className="relative h-48 group overflow-hidden rounded-lg border">
                        <Image
                            src={film.imageUrl}
                            alt="Постер фильма"
                            fill
                            className="object-cover transition-transform duration-300 group-hover:opacity-75"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">Нет изображения</span>
                    </div>
                )}
            </div>
            <CardHeader className="flex justify-between items-center text-black">
                <h2 className="text-xl font-bold">{film.name}</h2>
            </CardHeader>
            <CardBody className="flex-1 text-black">
                <h3 className="mt-4 font-semibold">Актеры: </h3>
                <ul className="list-disc pl-5 overflow-y-auto max-h-24">
                    {film.actors.map((actor) => (
                        <li key={actor.id}>
                            {actor.actor.name}
                        </li>
                    ))}
                </ul>
            </CardBody>
            <div className="flex justify-end gap-2 p-4">
                <Link href={`/films/${film.id}`}>
                    <Button color="primary" variant="light">
                        Редактировать
                    </Button>
                </Link>
                <Button
                    color="danger"
                    variant="light"
                    onPress={handleDelete}
                    isLoading={isPending}
                >
                    Удалить
                </Button>
            </div>
        </Card>
    )
}

export default FilmCard;