import React from 'react'
import RenderDataList from './render_data_list'
function data_list() {
    const Person =[
        {
            id: 1,
            name: "Sadaqat",
            department: "CS"
        },
        {
            id: 2,
            name: "Usman",
            department: "EE"
        },
        {
            id: 3,
            name: "Awais",
            department: "Math"
        }
    ]

  return (
    <div>
      <RenderDataList Person={Person}/>
    </div>
  )
}

export default data_list
