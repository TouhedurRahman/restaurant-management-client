import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import RequiredFieldErrorMsg from "../../../components/RequiredFieldErrorMsg/RequiredFieldErrorMsg";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";

const img_hosting_token = import.meta.env.VITE_Img_Upload_Token;

const AddItem = () => {
    const [categoryErrVisible, setCategoryErrVisible] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();

    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const handleAddItem = (data) => {
        setCategoryErrVisible(false);
        if (data.category === "default") {
            setCategoryErrVisible(true);
            return;
        }

        // upload image to Imagebb
        const formData = new FormData();
        formData.append("image", data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                const imgURL = imgResponse.data.display_url;
                const { name, price, category, recipe } = data;
                const newItem = {
                    name,
                    price: parseFloat(price),
                    category,
                    recipe,
                    image: imgURL
                }
                console.log(newItem);
                axiosSecure.post('/menu', newItem)
                    .then(data => {
                        if (data.data.insertedId) {
                            reset();
                            Swal.fire({
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            })
    }

    return (
        <div>
            <Helmet>
                <title>Bistro | Add Item</title>
            </Helmet>
            <SectionTitle
                subHeding={"What's New?"}
                heading={"Add An Item"}
            ></SectionTitle>
            <div className="my-12 ml-3 p-12 bg-gray-100 rounded-xl">
                <form onSubmit={handleSubmit(handleAddItem)} className="space-y-4">
                    {/* name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            autoComplete="off"
                            placeholder="Item Name Here"
                            className="input w-full"
                        />
                        {errors.name?.type === "required" && <RequiredFieldErrorMsg />}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {/* category */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register("category")}
                                className="select select-bordered w-full">
                                <option value="default" disabled>
                                    Choose Category
                                </option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                            {categoryErrVisible && (
                                <span className="text-red-500">Please choose a category</span>
                            )}
                        </div>
                        {/* price */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                {...register("price", { required: true })}
                                min={0}
                                step={0.01}
                                placeholder="Item Price"
                                className="input w-full"
                            />
                            {errors.price?.type === "required" && <RequiredFieldErrorMsg />}
                        </div>
                    </div>
                    {/* Recipe Details */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Recipe Details*</span>
                        </label>
                        <textarea
                            type="text"
                            {...register("recipe", { required: true })}
                            placeholder="Recipe Details"
                            className="input w-full h-28 py-3"></textarea>
                        {errors.recipe?.type === "required" && <RequiredFieldErrorMsg />}
                    </div>
                    <div className="form-control w-full">
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.JPG,.JPEG,.PNG,.GIF,.WEBP,.WebP,.SVG"
                            {...register("image", { required: true })}
                            className="file-input w-full max-w-xs"
                        />
                        {errors.image?.type === "required" && <RequiredFieldErrorMsg />}
                        <p>
                            <span className="text-sm italic font-bold">Max 5MB </span>
                            <span className="text-sm italic">
                                (Formats: .jpg, .jpeg, .png, .gif, .webp, .svg, .JPG, .JPEG,
                                .PNG, .GIF, .WEBP, .WebP, .SVG)
                            </span>
                        </p>
                    </div>
                    <button type="submit" className="btn btn-outline border-0 border-b-4 mt-4 text-black">
                        Add Item <FaUtensils />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;