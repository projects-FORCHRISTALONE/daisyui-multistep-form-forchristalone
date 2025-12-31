import React from 'react'

const StepAccount = ({data, onChange, errors}) => {
  return (
    <div className='space-y-4'>
        <div>
            <label htmlFor="" className='label mb-1'>Username</label>
            <input
                type='text'
                className={`input w-full ${errors.username ? "input-error"  : ""} `}
                value={data.username}
                onChange={(e)=> onChange("username", e.target.value)}
                placeholder='unworthyslaveTOCHRIST'
            />
            {
                errors.username && (
                    <p className='text-sm text-red-500 mt-1'>
                        {errors.username}
                    </p>
                )
            }
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
                <label className='label m-1'>Password</label>
                <input
                    type='password'
                    className={`input w-full ${errors.password ? "input-error" : ""}`}
                    value={data.password || ""}
                    onChange={(e)=> onChange("password", e.target.value)}
                    placeholder='*********'
                />
                {
                    errors.password && (
                        <p className='text-sm text-red-500 mt-1'>
                            {errors.password}
                        </p>
                    )
                }
            </div>
            <div>
                <label className='label mb-1'>Confirm Password</label>
                <input
                    type='password'
                    className={`input w-full ${errors.passwordConfirm ? "input-error" : ""}`}
                    value={data.passwordConfirm || ""}
                    onChange={(e)=> onChange("passwordConfirm", e.target.value)}
                    placeholder='*********'
                />
                {
                    errors.passwordConfirm && (
                        <p className='text-sm text-red-500 mt-1'>
                            {errors.passwordConfirm}
                        </p>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default StepAccount