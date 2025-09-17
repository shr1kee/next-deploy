import {create} from "zustand";
import {IFilm} from "@/types/film";
import {createFilm, deleteFilm, getFilms, updateFilm} from "@/actions/films";

interface IActionResult {
    success: boolean;
    film?: IFilm;
    error?: string;
}
interface IFilmState {
   films: IFilm[];
   isLoading: boolean;
   error: string | null;
   loadFilms: () => Promise<void>;
   addFilm: (formData: FormData) => Promise<IActionResult>;
   updateFilm: (id: string, formData: FormData) => Promise<IActionResult>;
   removeFilm: (id: string) => Promise<void>;
}


export const useFilmStore = create<IFilmState>((set) => ({
    films: [],
    isLoading: false,
    error: null,
    loadFilms: async () => {
        set({isLoading: true, error: null});
        try {
            const result = await getFilms();

            if(result.success) {
                set({films: result.films, isLoading: false});
            } else {
                set({isLoading: false, error: result.error})
            }
        } catch (error) {
            set({isLoading: false, error: "An error occurred."});
        }
    },
    addFilm: async (formData: FormData) => {
        set({isLoading: true, error: null});
        try {
            const result = await createFilm(formData);
            if(result.success) {
                set((state) => ({
                    films: [...state.films, result.film],
                    isLoading: false
                }))
                return {success: true, film: result.film}
            } else {
                set({isLoading: false, error: result.error});
                return {success: false, error: result.error}
            }
        } catch(error) {
            set({isLoading: false, error: "An error occurred."});
            return {success: false, error: "An error occurred."};
        }
    },
    updateFilm: async (id: string, formData: FormData) => {
        set({isLoading: true, error: null});
        try {
            const result = await updateFilm(id, formData);
            if(result.success) {
                set((state) => ({
                    films: state.films.map((film) => film.id === id ? result.film : film),
                    isLoading: false
                }))
                return {success: true, film: result.film}
            } else {
                set({error: result.error, isLoading: false});
                return {success: false, error: result.error};
            }

        } catch(error) {
            set({isLoading: false, error: "An error occurred."});
            return {success: false, error: "An error occurred."};
        }
    },
    removeFilm: async (id: string) => {
        set({isLoading: true, error: null});
        try {
            const result = await deleteFilm(id);
            if (result.success) {
                set((state) => ({
                    films: state.films.filter((film) => film.id === id),
                    isLoading: false
                }))
            } else {
                set({error: result.error, isLoading: false});
            }
        } catch(error) {
            set({error: "An error occurred.", isLoading: false});
        }
    }
}))