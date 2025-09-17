import {create} from "zustand";
import {IActor} from "@/types/actor";
import {createActor, deleteActor, getActors} from "@/actions/actors";

interface IActorState {
    actors: IActor[];
    isLoading: boolean;
    error: string | null;
    loadActors: () => Promise<void>;
    addActor: (formData: FormData) => Promise<void>;
    removeActor: (id: string) => Promise<void>;

}

export const useActorStore = create<IActorState>((set) => ({
    actors: [],
    isLoading: false,
    error: null,
    loadActors: async () => {
        set({isLoading: true, error: null});
        try {
            const result = await getActors();
            if (result.success) {
                set({actors: result.actors, isLoading: false});
            } else {
                set({error: result.error, isLoading: false});
            }
        } catch(error) {
            set({error: error, isLoading: false});
        }
    },
    addActor: async (formData: FormData) => {
        set({isLoading: true, error: null});
        try {
           const result = await createActor(formData);
           if (result.success) {
               set((state) => ({actors: [...state.actors, result.actor], isLoading: false}));
           } else {
               set({error: result.error, isLoading: false});
           }
        } catch(error) {
            set({error: error, isLoading: false});
        }
    },
    removeActor: async (id: string) => {
        set({isLoading: true, error: null});
        try {
            const result = await deleteActor(id);
            if (result.success) {
                set((state) => ({actors: state.actors.filter(
                        (actor) => actor.id !== id
                    ),
                isLoading: false}));
            }

        } catch(error) {
            set({error: error, isLoading: false});
        }
    }
}))