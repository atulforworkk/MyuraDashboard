import React from 'react'
import { Button } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'
type Props = {}

const PageNotFound = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen w-screen text-2xl font-semibold">
      <h1>404 - Page Not Found </h1>
      <Button className='bg-sidebar-color'   onClick={() => navigate("/home")}
      >
        Go Back to Main page 
      </Button>
    </div>
  )
}

export default PageNotFound