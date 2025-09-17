"use client"

import {useActorStore} from "@/store/actors.store";
import {useAuthStore} from "@/store/auth.store";
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@heroui/react";
import {CATEGORY_OPTIONS} from "@/constants/select-options";

const ActorsTable = () => {
    const {actors, removeActor, isLoading} = useActorStore()
    const { isAuth } = useAuthStore()

    const handleDelete = async (id: string) => {
        await removeActor(id)
    }

    const getCategoryLabel = (name: string) => {
        const option = CATEGORY_OPTIONS.find((opt) => opt.value == name)
        return option ? option.label : name
    }

    if(!isAuth) {
        return <p>Не авторизован</p>
    }

    return !isLoading && isAuth ? (
        <Table
            aria-label="Список актеров"
            classNames={{
                wrapper: "mt-4",
                table: "w-full",
                th: "text-black",
                td: "text-black"
            }}
        >
            <TableHeader>
                <TableColumn>Имя</TableColumn>
                <TableColumn>Категория</TableColumn>
                <TableColumn>Год</TableColumn>
                <TableColumn>Действия</TableColumn>
            </TableHeader>
            <TableBody>
                {actors.map(actor => (
                    <TableRow key={actor.id}>
                        <TableCell>{actor.name}</TableCell>
                        <TableCell>{getCategoryLabel(actor.category)}</TableCell>
                        <TableCell>{actor.year}</TableCell>
                        <TableCell>
                            <Button
                                color="danger"
                                size="sm"
                                onPress={() => handleDelete(actor.id)}>
                                Удалить
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) :(
        <p className="mt-4">Загрузка...</p>
    )

}

export default ActorsTable;