import React from 'react'

const StepSummary = ({data, onChange, errors}) => {
  return (
    <div className='space-y-4'>
        <h3 className='text-lg font-semibold'>Review</h3>
        <div className='grid gap-2'>
            <div className='flex justify-between'>
                <span className='font-medium'>Full Name</span>
                <strong>{data.fullName}</strong>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Email</span>
                <strong>{data.email}</strong>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Username</span>
                <strong>{data.username}</strong>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Selected plan</span>
                <strong>{data.plan}</strong>
            </div>
            <div className='flex justify-between'>
                <span className='font-medium'>Email Notifications</span>
                <strong>{data.notifications ? "On" : "Off"}</strong>
            </div>
        </div>
    </div>
  )
}

export default StepSummary