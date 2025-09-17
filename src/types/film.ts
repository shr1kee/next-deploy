import {IActor} from "@/types/actor";

export interface IFilmActor {
    id: string;
    actorId: string;
    actor: IActor;
}
export interface IFilm {
    id: string;
    name: string;
    imageUrl?: string | null;
    actors: IFilmActor[];
}