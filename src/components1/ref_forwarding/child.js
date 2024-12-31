import React from 'react'

const  child=React.forwardRef((props,ref)=> {
        return (
          <div>
            <input type='date' ref={ref}></input>
          </div>
        )
      }
) 

export default child
