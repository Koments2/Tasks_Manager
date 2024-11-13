export type Options = false | { id: number; name: string; value: string }[]

export interface TaskField {
    id: number;
    type: string,
    name: 'title' | 'description' | 'status' | 'createdAt' | "image";
    required: boolean;
    options: Options; // Either false (no options) or an array of options
    label: string;
    placeholder?: string; // Optional placeholder
}

export interface TaskForm {
    formType: string; // e.g., 'newTask'
    title: string;
    fields: TaskField[];
    button: string;
    class: string;
}
