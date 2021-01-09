export interface Todo {
    key: number;
    text: string;
}
export interface TimeFrameData {
    key: number;
    tags: string[];
    todos: Todo[];
}
