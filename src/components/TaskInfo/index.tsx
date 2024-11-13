import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {SubmitHandler, useForm} from "react-hook-form";
import classes from './form.module.css';
import {task} from "./UserTagData";
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Options, TaskData, TasksType} from "../../types/Types";
import {editTask} from "../../store/reducers/TasksReducer";
import {Task} from "../TaskList/Types";
import successMessage from "../../const/tostify/success";

const TaskInfo = () => {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<TaskData>();
    const {fields, title, class: formClass} = task;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    const tasks = useSelector((state: TasksType) => state?.tasks?.tasks);
    const taskToEdit = tasks.find((task: Task) => task.id.toString() === id);

    const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
    const [imageFile, setImageFile] = useState<File | null>(null); // State for the selected image file

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // Handle form submission
    const onSubmit: SubmitHandler<TaskData> = async (data) => {
        if (id) {
            if (imageFile) {
                // Convert the image to Base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result as string;
                    dispatch(editTask({...data, id: Number(id), image: base64Image}));
                };
                reader.readAsDataURL(imageFile);
            } else {
                dispatch(editTask({...data, id: Number(id), image: taskToEdit?.image}));
            }
            navigate("/tasks");
            successMessage("Завдання відредаговано");
        }
    };

    // Load task data into the form
    useEffect(() => {
        if (taskToEdit) {
            setValue("title", taskToEdit.title);
            setValue("description", taskToEdit.description);
            setValue("status", taskToEdit.status);
            setValue("createdAt", taskToEdit.createdAt);
            // Set image preview if an image exists
            if (taskToEdit.image) {
                setImagePreview(taskToEdit.image); // Assuming image is in base64 format
            }
        }
    }, [taskToEdit, setValue]);

    // Handle image change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.form__wrapper}>
                <div className={classNames(classes.form__title)}>
                    {`Задача номер ${id}`}
                </div>
            </div>
            {fields.map((field) => (
                <div className={classes[formClass]} key={field.id}>
                    {field.name !== "image" ? <label className={classes.form__label} htmlFor={field.name}>
                        {field.label}
                    </label> : imagePreview ? <label className={classes.form__label} htmlFor={field.name}>
                        {field.label}
                    </label> : <> </>}
                    <div>
                        {field.options ? (
                            <select
                                className={classes.form__select}
                                {...register(field.name, {required: field.required})}
                                disabled={true}
                            >
                                {field?.options?.map((option: Options) => (
                                    <option key={option.id} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        ) : field.name === "image" ? (
                            // Image input field
                            <div>
                                {imagePreview && (
                                    <div className={classes.imagePreview}>
                                        <img src={imagePreview} alt="Image Preview" className={classes.imagePreview__img}/>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <input
                                className={classNames(
                                    classes.form__input,
                                    {[classes.errorInput]: errors[field.name]}
                                )}
                                type={field.type}
                                placeholder={field.placeholder}
                                defaultValue={field.type === 'date' ? formattedDate : undefined}
                                {...register(field.name, {required: field.required})}
                                readOnly={true}
                            />
                        )}
                        {errors[field.name] && (
                            <p className={classes.errorHint}>
                                Це поле є обов'язковим
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </form>
    );
};

export default TaskInfo;
