import {TaskForm} from "./types";

export const task: TaskForm = {
    "formType": 'newTask',
    "title": 'Редагувати задачу',
    "fields": [
        {
            id: 1,
            type: 'title',
            name: 'title',
            required: true,
            options: false,
            label: 'Назва',
            placeholder: 'Назва',
        },
        {
            id: 2,
            type: 'description',
            name: 'description',
            required: false,
            options: false,
            label: 'Опис',
            placeholder: 'Опис',
        },
        {
            id: 3,
            type: 'select',
            name: 'status',
            required: true,
            options: [
                { id: 1, name: 'Невиконане', value: 'Невиконане' },
                { id: 2, name: 'Виконане', value: 'Виконане' },
            ],
            label: 'Статус',
        },
        {
            id: 4,
            type: 'date',
            name: 'createdAt',
            required: false,
            options: false,
            label: 'Кінцева дата',
            placeholder: 'Кінцева дата',
        },{
            id: 5,
            type: 'input',
            name: 'image',
            required: false,
            options: false,
            label: 'Відредагувати зображення',
        }
    ],
    "button": 'Змінити',
    "class": 'form__box__login'
}