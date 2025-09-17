"use client"

import {useState, useTransition} from "react";
import {Button, Form, Input, Select, SelectItem} from "@heroui/react";
import {CATEGORY_OPTIONS} from "@/constants/select-options";
import {useActorStore} from "@/store/actors.store";

const initialState = {
    name: "",
    category: "",
    year: null as number | null
}

const ActorForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState(initialState);
    const { addActor } = useActorStore();
    const [isPending, startTransition] = useTransition();
    const handleSubmit = async (formData: FormData) => {
        startTransition((async () => {
            await addActor(formData)
            const storeError = useActorStore.getState().error;
            if (storeError) {
                setError(storeError)
            } else {
                setError(null)
                setFormData(initialState)
            }
        }))
    }
    return (<Form className="w-full" action={handleSubmit}>
        <Input
            isRequired
            name="name"
            placeholder="Введите имя"
            type="text"
            value={formData.name}
            classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm focus:outline-none"
            }}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            validate={(value) => {
                if(!value) return "Название обязательно"
                return null;
            }}
        ></Input>
        <div className = "flex gap-2 w-full">
            <div className="w-1/3">
                <Select
                    isRequired
                    name="category"
                    aria-label="category"
                    placeholder="Категория"
                    selectedKeys={formData.category ? [formData.category] : []}
                    classNames={{
                        trigger: "bg-default-100 w-full",
                        innerWrapper: "text-sm",
                        value: "truncate",
                        selectorIcon: "text-black"
                    }}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}

                >
                    {CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} className="text-black">
                            {option.label}
                        </SelectItem>
                    ))}
                </Select>
            </div>
            <div className="w-1/3">
                <Input
                isRequired
                name="year"
                placeholder="год"
                type="number"
                value={formData.year !== null ? formData.year.toString() : null}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => {
                    setFormData({...formData, year: parseInt(e.target.value)});
                }}>
                </Input>
            </div>
        </div>
        <div className="flex w-full items-center justify-end">
            <Button color="primary" type="submit" isLoading={isPending}>
                Добавить
            </Button>
        </div>

    </Form>)
}

export default ActorForm;