import React from 'react'

const StepPersonal = ({data, errors, onChange}) => {
  return (
    <>
    
    <div>
        <label className='label mb-1'>Full name</label>
        <input type="text" className={`input input-success w-full ${errors.fullName ? "input-error" : ""}`}  value = {data.fullName || ""} onChange={(e)=>onChange("fullName", e.target.value)} placeholder = "Lazarus Jesus"/>
        {
            errors.fullName && (
                <p className='text-sm text-red-500 mt-1'>
                    {errors.fullName}
                </p>
            )
        }
    </div>

    <div>
        <label className='label mb-1'>Email</label>
        <input type="email" className={`input w-full ${errors.email ? "input-error" : ""}`}  value = {data.email || ""} onChange={(e)=>onChange("email", e.target.value)} placeholder = "righteousnessbyfaithinjesus@gmail.com"/>
        {
            errors.email && (
                <p className='text-sm text-red-500 mt-1'>
                    {errors.email}
                </p>
            )
        }
    </div>

    <div>
        <label className='label mb-1'>About (optional)</label>
        <textarea 
            className="textarea w-full resize-none"  
            value = {data.about || ""} 
            onChange={(e)=>onChange("about", e.target.value)} 
            placeholder = "A short praise you want to render unto THE LORD..."
            rows={4}
            maxLength = {150}
        >
        </textarea>
    </div>
    </>
    
  )
}

export default StepPersonal