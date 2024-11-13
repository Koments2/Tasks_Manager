export const tableTitle = ['ID', 'Назва', 'Опис', 'Статус', 'Кінцева дата', ''];

export const filterDate = [
    {name: 'id', placeholder: 'Пошук за ID', type: "number"},
    {name: 'title', placeholder: 'Пошук за назвою'},
    {name: 'description', placeholder: 'Пошук за описом'},
    {
        name: 'status', placeholder: 'Пошук за статусом', options: [{name: 'Усі', value: ''}, {name: 'Невиконане', value: 'Невиконане'}, {
            name: 'Виконане',
            value: 'Виконане'
        }], type: "select"
    },
    {name: 'createdAt', placeholder: 'Пошук за датою', type: "date"},

];

export const searchOptions = [
    {value: "id", name: "за ID", type: "text"},
    {value: "title", name: "за назвою", type: "text"},
    {value: "description", name: "за описом", type: "text"},
    {value: "status", name: "за статусом", type: "text"},
    {value: "createdAt", name: "за датою", type: "date"},
];