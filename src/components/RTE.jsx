import React from 'react'
import ReactQuill from 'react-quill'
import { Controller } from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>
                {label}
            </label>}

            <Controller
                name={name || "content"}
                control={control}
                defaultValue={defaultValue} // Ensure the defaultValue is passed
                render={({ field: { value, onChange } }) => (
                    <ReactQuill
                        value={value || defaultValue} // Ensure value is passed correctly
                        onChange={onChange} // Correctly bind the onChange to react-hook-form
                        modules={{
                            toolbar: [
                                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['bold', 'italic', 'underline'],
                                ['link', 'image'],
                                [{ 'align': [] }],
                                ['clean']
                            ]
                        }}
                        theme="snow"
                    />
                )}
            />
        </div>
    )
}
