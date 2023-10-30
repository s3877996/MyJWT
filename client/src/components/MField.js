import React from "react";
import { useField } from "formik";

const MField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    // console.log(field);
    return (
        <div className="flex flex-col gap-2">
            <label className="font-semibold" htmlFor={field.name}>
                {label}
            </label>
            <input
                className="p-3 border border-gray-300 rounded-lg"
                {...field}
                {...props}
            />
            {meta.touched && meta.error ? (
                <div className="text-sm text-red-500">{meta.error}</div>
            ) : null}
        </div>
    );
};

export default MField;
