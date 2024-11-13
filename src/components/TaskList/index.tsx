import React, {ChangeEvent, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import TBody from "../../common/TActions";
import TSort from "../../common/TSort";
import {filterDate, searchOptions, tableTitle} from "./settings";
import {Filters, Task} from "./Types";
import PaginationBottom from "../../common/PaginationBottom";
import {useSelector} from "react-redux";
import {TasksType} from "../../types/Types";

const TaskList = () => {
    const data = useSelector((state: TasksType) => state?.tasks?.tasks)

    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[] | []>([]);
    const [perPage, setPerPage] = useState<number>(10);
    const [limit, setLimit] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [action, setAction] = useState<number>(0);

    const [filters, setFilters] = useState<Filters>({
        id: 0,
        title: "",
        description: "",
        status: "",
        offset: 0,
        limit: 10,
        sortBy: "id",
    });

    console.log(data)

    // Handle changes in filters (text or select)
    const handleFilterChange = (
        e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFilters({
            ...filters,
            [name]: value,
            offset: 0,
        });
    };

    const handleLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLimit = Number(e.target.value);
        setPerPage(newLimit);
        setFilters((prevFilters) => ({
            ...prevFilters,
            limit: newLimit,
            offset: 0,
        }));
    };

    const sortByFilter = (sortField: string) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sortBy: sortField,
            offset: 0,
        }));

        setCurrentPage(1);
    };

    const handlePaginationChange = (pageNum: number) => {
        const offset = (pageNum - 1) * perPage;
        setFilters((prevFilters) => ({
            ...prevFilters,
            offset: offset,
        }));
        setCurrentPage(pageNum);
    };

    const getNonEmptyFilters = () => {
        return Object.keys(filters).reduce((acc: any, key: string) => {
            if (filters[key] && filters[key] !== "" && filters[key] !== 0) {
                acc[key] = filters[key];
            }
            return acc;
        }, {});
    };

    useEffect(() => {
        // Get the filters that are not empty
        const nonEmptyFilters = getNonEmptyFilters();
        const queryParams = new URLSearchParams(nonEmptyFilters).toString();
        const fields: (keyof Task)[] = ['id', 'title', 'description', 'status', 'createdAt'];

        // Filter the data based on the selected filters
        const filteredData = data?.filter(item => {
            return Object.keys(nonEmptyFilters).every((key) => {
                const filterValue = nonEmptyFilters[key];
                const itemValue = item[key];
                if (filterValue && itemValue) {
                    return itemValue.toString().includes(filterValue.toString());
                }
                return true;
            });
        });

        // Sort the filtered data if a sort condition is specified
        let sortedData = filteredData;

        if (filters.sortBy) {
            const sortBy = filters.sortBy;
            const sortOrder = filters.sortOrder || 'asc';

            sortedData = filteredData.sort((a, b) => {
                const aValue = a[sortBy];
                const bValue = b[sortBy];

                if (aValue === bValue) return 0;

                const comparison = (aValue < bValue ? -1 : 1);
                return sortOrder === 'asc' ? comparison : -comparison;
            });
        }

        // Set pagination settings
        const limit = filters.limit || 10;
        const offset = filters.offset || 0;

        // Paginate the sorted data based on the current offset and limit
        const paginatedData = sortedData.slice(offset, offset + limit);

        // Map the paginated data to only include the required fields
        const result = paginatedData.map(item => {
            return fields.reduce((acc, field) => {
                acc[field] = item[field];
                return acc;
            }, {} as Partial<Task>);
        });

        // Set the state for tasks with the paginated result
        setTasks(result as Task[]);

        // Update the limit based on the filtered data length (not the full data length)
        setLimit(filteredData.length);

        // Update the URL with the current filters
        navigate(`?${queryParams}`);
    }, [filters, action, data]);


    return (
        <div className="container">
            <h1 className="text-center mb-5 text-primary">Task Manager</h1>
            <TSort
                setSortField={sortByFilter}
                perPage={perPage}
                handleLimitChange={handleLimitChange}
                title={"Створити задачу"}
                navigateUrl={"/add-task"}
                searchOptions={searchOptions}
            />
            <div className="table-responsive">
                <table className="table table-bordered table-hover">
                    <thead>
                    <tr>
                        {tableTitle.map((header, index) => (
                            <th key={index} className="text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                    <tr>
                        {filterDate.map(
                            ({name, placeholder, type = "text", options}, index) => (
                                <th key={index} className="text-center">
                                    {type === "select" ? (
                                        <select
                                            name={name}
                                            value={filters[name]}
                                            onChange={handleFilterChange}
                                            className="form-select"
                                        >
                                            {options?.map((option, optIndex) => (
                                                <option key={optIndex} value={option?.value}>
                                                    {option?.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={type}
                                            name={name}
                                            value={filters[name] && filters[name]}
                                            onChange={handleFilterChange}
                                            placeholder={placeholder}
                                            className="form-control"
                                        />
                                    )}
                                </th>
                            )
                        )}
                        <th></th>
                    </tr>
                    </thead>
                    <TBody
                        paginatedInfo={tasks}
                        setAction={setAction}
                        deleteUrl={"user"}
                        handleUrl={"edit-task"}
                        navigateUrl={"task-info"}
                        deleteTitle={"Задачу видалено"}
                        setCurrentPage={handlePaginationChange}
                    />
                </table>
            </div>
            <PaginationBottom
                limit={limit}
                perPage={perPage}
                currentPage={currentPage}
                setCurrentPage={handlePaginationChange}
            />
        </div>
    );
};

export default TaskList;
