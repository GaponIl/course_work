import React from 'react'
import '../style/Form.css'

function Form({ title, children }) {
  return (
    <div className='form-bg'>
        <div className="form-container">
            <div className="form-data">
                <div className="form-header">
                    <h1>{title}</h1>
                </div>
                <div className="form-body">
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Form
