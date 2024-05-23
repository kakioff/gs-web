export interface Recipe {
    id: number,
    name: string,
    img?: string,
    persist: string[],
    desc: string,
    steps: string,
    source: string,
    createTime: string,
    updateTime?: string,
    grade: number,
    user: {
        id: number,
        name: string
    }
}