"use client"

import {IFilm} from "@/types/film";
import {useState, useTransition} from "react";
import {useActorStore} from "@/store/actors.store";
import {useFilmStore} from "@/store/form.store";

import {Button, Form, Input, Select, SelectItem} from "@heroui/react";
import {useRouter} from "next/navigation";

interface FilmFormProps {
    initialFilm?: IFilm;
}

interface IActorField {
    id: number;
    actorId: string;
}

const initialState = {
    name: "",
    imageUrl: ""
}

const FilmForm = ({ initialFilm }: FilmFormProps) => {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: initialFilm?.name || initialState.name,
        imageUrl: initialFilm?.imageUrl || initialState.imageUrl,
    })
    const [actorFields, setActorFields] = useState<IActorField[]>(
        initialFilm?.actors ?
            initialFilm.actors.map((actor, index) => ({
                id: index,
                actorId: actor.actorId,
            })) : [{id: 0, actorId: ''}]);

    const {actors} = useActorStore();
    const {addFilm, updateFilm} = useFilmStore();
    const [isPending, startTransition] = useTransition()

    const router = useRouter()
    const handleAddActorField = () => {
        if (actorFields.length < 10) {
            setActorFields([
                ...actorFields,
                {id: actorFields.length, actorId: ""}
            ])
        }
    }

    const handleRemoveActorField = (id: number) => {
        if (actorFields.length > 1)  {
            setActorFields(actorFields.filter((f) => f.id !== id))
        }

    }

    const handleActorChange = (
        id: number,
        field: keyof IActorField,
        value: string | number | null
    ) => {
        setActorFields(
            actorFields.map((f) => (f.id === id ? {...f, [field] : value} : f))
        )
    }



    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            setError(null);

            const result = initialFilm ? await updateFilm(initialFilm.id, formData)
                : await addFilm(formData);

            if (result.success) {
                setActorFields([{id: 0, actorId: ""}])
                router.push("/")
                setFormData(initialState)
            } else {
                setError(result.error || "Error saving film")
            }

        })
    }

    return (
        <Form className="w-[450px]" action={handleSubmit}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <Input
                isRequired
                name="name"
                placeholder="Введите название фильма"
                type="text"
                value={formData.name}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                validate={(value) => (!value ? "Название обязательно" : null)}
            >
            </Input>
            <Input
                name="imageUrl"
                placeholder="URL изображения (необязательно)"
                type="url"
                value={formData.imageUrl}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            >
            </Input>
            <div className="space-y-2 w-full">
                {actorFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                        <Select
                            isRequired
                            name={`actor_${index}`}
                            placeholder="Выберите актера"
                            selectedKeys={field.actorId ? [field.actorId] : []}
                            classNames={{
                                trigger: "bg-default-100 w-full",
                                innerWrapper: "text-sm",
                                value: "truncate",
                                selectorIcon: "text-black"
                            }}
                            onChange={(e) =>
                            handleActorChange(field.id, "actorId", e.target.value)}
                        >
                            {actors.map((actor) => (
                                <SelectItem key={actor.id} className="text-black">
                                    {actor.name}
                                </SelectItem>
                            ))}
                        </Select>
                        {actorFields.length > 1 && (
                            <Button
                                color="danger"
                                variant="light"
                                onPress={() => handleRemoveActorField(field.id)}
                                className="w-[50px]"
                            >-</Button>
                        )}
                    </div>
                ))}
                {actorFields.length < 10 && (
                    <Button
                        color="primary"
                        variant="flat"
                        onPress={handleAddActorField}
                    >+</Button>
                )}
            </div>
            <div className="flex w-full items-center justify-end mt-4">
                <Button color="primary" type="submit" isLoading={isPending}>
                    {initialFilm ? "Сохранить изменения" : "Добавить фильм"}
                </Button>
            </div>
        </Form>
    )
}

export default FilmForm;
