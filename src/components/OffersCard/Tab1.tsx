import React from 'react'

import { CategoryType } from "../Category";
import { useForm } from 'react-hook-form';
import { useGetCategoriesQuery } from '@/store/slice/products';
import { errorTranslations, fields } from "./projectAddRequires";



export default function Tab1() {
const { register } = useForm()
const { data: getCategories } = useGetCategoriesQuery(undefined);;
  return (
    <div className="max-w-7xl m-auto flex flex-wrap justify-between items-center gap-y-7  text-custom-gray">
       <div className="w-[48%] grid">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                Turkum
                </label>
                <select
                {...register("category", { required: true })} 
                className="w-full bg-background rounded-md p-2 focus:outline-none"
                >
                {getCategories &&
                    getCategories.map((category: CategoryType) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
            </div>

            {fields
                .filter((field) => field.type !== "textarea") 
                .map((field) => (
                    <div key={field.name} className="w-[48%] flex flex-col justify-center">
                    <label className="block text-sm font-medium capitalize leading-9">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        required
                        step={field.step || undefined}
                        placeholder={field.placeholder || ""}
                        {...register(field.name, { required: true })}
                        className="w-full p-3 px-3  border-gray-300 rounded-xl"
                    />
                    </div>
                ))}
    </div>
  )
}
