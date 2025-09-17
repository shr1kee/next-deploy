"use server"

import {actorsSchema} from "@/schema/zod";
import prisma from "@/utils/prisma";

export async function createActor(formData: FormData) {
    try {
        console.log("form data", formData);
        const data = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            year: parseInt(formData.get("year") as string)
        }
        const validatedData = actorsSchema.parse(data);
        const actor = await prisma.actor.create({data: validatedData});
        return {success: true, actor}

    } catch(error) {
        return {success: false, error: "Actor already exists"};
    }
}

export async function getActors() {
    try {
        const actors = await prisma.actor.findMany({});
        return {success: true, actors};
    } catch(error) {
        console.error("Error getting actors", error);
        return {error: "Something went wrong"}
    }
}

export async function deleteActor(id: string) {
    try {
        const actor = await prisma.actor.delete({
            where: {id}
        })
        return {success: true, actor}
    } catch(error) {
        console.error("Error deleting actor", error);
        return {error: "Something went wrong"}
    }
}