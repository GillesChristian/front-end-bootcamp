import { EditStudentForm } from '@/components/EditStudentForm'
import React from 'react'

interface EditStudentPageProps {
  params: {
    id: string
  }
}

function EditStudentPage({ params }: EditStudentPageProps) {
  return (
    <div className="container ml-[256px] w-full px-20 py-5 flex flex-col items-center justify-center gap-20 text-left">
      <h2 className="text-4xl font-semibold text-gray-400">Edit Student</h2>
      <EditStudentForm params={params} />
    </div>
  )
}

export default EditStudentPage
