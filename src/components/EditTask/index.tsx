import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from "react-hook-form";
import classes from './form.module.css';
import { task } from "./UserTagData";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Options, TaskData, TasksType } from "../../types/Types";
import { editTask } from "../../store/reducers/TasksReducer";
import { Task } from "../TaskList/Types";
import successMessage from "../../const/tostify/success";

const EditTask = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskData>();
    const { fields, title, button, class: formClass } = task;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();

    const tasks = useSelector((state: TasksType) => state?.tasks?.tasks);
    const taskToEdit = tasks.find((task: Task) => task.id.toString() === id);

    const [imagePreview, setImagePreview] = useState<string | null>(null); // State to store image preview
    const [imageFile, setImageFile] = useState<File | null>(null); // State to store the selected image file

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const onSubmit: SubmitHandler<TaskData> = async (data) => {
        const taskData = {
            ...data,
            id: Number(id),
            image: imageFile ? await encodeImage(imageFile) : imagePreview // Use the existing image if no new image is selected
        };

        if (id) {
            dispatch(editTask(taskData));
            navigate("/tasks");
            successMessage("Завдання відредаговано");
        }
    };


    useEffect(() => {
        if (taskToEdit) {
            setValue("title", taskToEdit.title);
            setValue("description", taskToEdit.description);
            setValue("status", taskToEdit.status);
            setValue("createdAt", taskToEdit.createdAt);
            if (taskToEdit.image) {
                setImagePreview(taskToEdit.image); // Set image preview from existing task data
            }
        }
    }, [taskToEdit, setValue]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setImagePreview(fileReader.result as string);
            };
            fileReader.readAsDataURL(file);
        }
    };

    // Function to encode image file to Base64 string
    const encodeImage = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.form__wrapper}>
                <div className={classNames(classes.form__title)}>
                    {`${title} ${id}`}
                </div>
            </div>
            {fields.map((field) => (
                <div className={classes[formClass]} key={field.id}>
                    <label className={classes.form__label} htmlFor={field.name}>
                        {field.label}
                    </label>
                    <div>
                        {field.name === "image" ? (
                            <div>
                                <input
                                    type="file"
                                    className={classes.form__input}
                                    accept="image/*"
                                    {...register("image")}
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <div className={classes.imagePreview}>
                                        <img
                                            src={imagePreview}
                                            alt="Image Preview"
                                            className={classes.imagePreview__img}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : field.options ? (
                            <select
                                className={classes.form__select}
                                {...register(field.name, { required: field.required })}
                            >
                                {field?.options?.map((option: Options) => (
                                    <option key={option.id} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                className={classNames(
                                    classes.form__input,
                                    { [classes.errorInput]: errors[field.name] }
                                )}
                                type={field.type}
                                placeholder={field.placeholder}
                                defaultValue={field.type === 'date' ? formattedDate : undefined}
                                {...register(field.name, { required: field.required })}
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
            <button className={classes.form__button} type="submit">
                {button}
            </button>
        </form>
    );
};

export default EditTask;