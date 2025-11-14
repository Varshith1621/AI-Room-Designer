import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function AdditionalReq({additionalRequirementInput}) {
  return (
    <div className='mt-5'>
        <label className='text-gray-400'>Enter Additional Requirements (optional)</label>
        <Textarea className='mt-2' onChange={(e)=>additionalRequirementInput(e.target.value)}/>
    </div>
  )
}

export default AdditionalReq