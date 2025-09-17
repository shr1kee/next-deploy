"use server"

import prisma from "@/utils/prisma";

export async function getFilms() {
    try {
        const films = await prisma.film.findMany({
            include: {
                actors: {
                    include: {
                        actor: true
                    }
                }
            }
        })
        return {success: true, films}
    } catch(error) {
        return {success: false, error: "Error fetching films"};
    }
}

export async function createFilm(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const imageUrl = formData.get("imageUrl") as string | null;
        const actors = Array.from(formData.entries())
            .filter(([key]) => key.startsWith("actor_"))
            .map(([key, value]) => ({
                actorId: value as string,
            }))
        if (!name || actors.length === 0) {
            return {success: false, error: "No actor found"};
        }

        const film = await prisma.film.create({
            data: {
                name,
                imageUrl,
                actors: {
                    create: actors.map(({actorId}) => ({
                        actor: {connect: {id: actorId}}
                    })),
                }
            },
            include: {
                actors: {
                    include: {
                        actor: true
                    }
                }
            }
        })
        return {success: true, film}
    } catch(error) {
        return {success: false, error: "Error creating films"};
    }
}

export async function updateFilm(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const imageUrl = formData.get("imageUrl") as string | null;
        const actors = Array.from(formData.entries())
            .filter(([key]) => key.startsWith("actor_"))
            .map(([key, value]) => ({
                actorId: value as string,
            }))
        if (!name || actors.length === 0) {
            return {success: false, error: "No actor found"};
        }
        const film = await prisma.film.update({
            where: {id},
            data: {
                name,
                imageUrl,
                actors: {
                    deleteMany: {},
                    create: actors.map(({actorId}) => ({
                        actor: {connect: {id: actorId}}
                    })),
                }
            },
            include: {
                actors: {
                    include: {
                        actor: true
                    }
                }
            }
        })
        return {success: true, film}
    } catch(error) {
        return {success: false, error: "Error updating film"};
    }
}

export async function deleteFilm(id: string) {
    try {
        await prisma.filmActor.deleteMany({
            where: {
                filmId: id
            }
        })

        await prisma.film.delete({
            where: {id}
        })
        return {success: true}
    } catch(error) {
        return {success: false, error: "Error deleting film"};
    }
}