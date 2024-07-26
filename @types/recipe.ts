export interface Recipe {
    created: string;
    desc?: string;
    group?: string;
    id: number;
    name: string;
    status: string;
    uid: number;
    updated?: string;
    username?: string;
}
export interface Comments {}
export interface Ingredients {
    desc: string;
    id: number;
    name: string;
    quantity: number;
    unit: string;

    done?: boolean
}
export interface Steps {
    desc?: string;
    id?: number;
    order?: number;
    title?: string;
}
export interface RecipeDetail extends Recipe {
    ingredients: Ingredients[];
    steps: Steps[];
    comments: Comments[];
}
