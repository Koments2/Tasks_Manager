import React, { useState } from 'react';
import classNames from 'classnames';
import { SubmitHandler, useForm } from "react-hook-form";
import classes from './form.module.css';
import { newTask } from "./UserTagData";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Options, TaskData } from "../../types/Types";
import { addTask } from "../../store/reducers/TasksReducer";

const AddTask = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<TaskData>(); // Correctly type the form data
    const { fields, title, button, class: formClass } = newTask;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imagePreview, setImagePreview] = useState<string | null>(null); // State to hold image preview
    const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the image file

    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    // Handle file input change event and update the image preview
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file); // Save the file
            const previewUrl = URL.createObjectURL(file); // Create a temporary URL for the image
            setImagePreview(previewUrl); // Update the preview state
            setValue("image", file); // Set the file in the form data
        }
    };

    const onSubmit: SubmitHandler<TaskData> = async (data) => {
        try {
            // If an image is selected, convert it to base64 or send the file directly
            if (imageFile) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64Image = reader.result as string; // Get the base64 string
                    dispatch(addTask({ ...data, image: base64Image })); // Add task with base64 image
                };
                reader.readAsDataURL(imageFile); // Convert the file to base64
            } else {
                dispatch(addTask(data)); // Dispatch the task without an image
            }

            navigate("/tasks"); // Redirect to the tasks list page
        } catch (error) {
            console.error("Error processing form:", error);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={classes.form__wrapper}>
                <div className={classNames(classes.form__title)}>
                    {title}
                </div>
            </div>
            {fields.map((field) => (
                <div className={classes[formClass]} key={field.id}>
                    <label className={classes.form__label} htmlFor={field.name}>
                        {field.label}
                    </label>
                    <div>
                        {field.options ? (
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
                        ) : field.name === "image" ? (
                            // Image upload input
                            <div>
                                {!imagePreview && (<input
                                    type="file"
                                    className={classes.form__input}
                                    {...register("image", { required: false })}
                                    onChange={handleImageChange}
                                />)}
                                {/* Display image preview if available */}
                                {imagePreview && (
                                    <div className={classes.imagePreview}>
                                        <img src={imagePreview} alt="Image Preview" className={classes.imagePreview__img} />
                                    </div>
                                )}
                            </div>
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

export default AddTask;
