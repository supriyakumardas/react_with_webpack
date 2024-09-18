import React, { useEffect, useState } from 'react';
import { Card } from 'antd';


const UserProfile = () => {

  return (
    <div style={{ padding: '180px' }} className="row-center">
    <Card className='card'>
  <div className='row-center img-div'>
    <div className='img-holder'>
      <img src={require('../../assets/images/users/user4.jpg')} className='card-img' />
    </div>
  </div>
  <div className='name-container'>
    <div className='name-text'>
      Supriya Kumar Das 
    </div>
  </div>
  <div className='details-container'>
    <div className='prop-value'>
      <div className='card-prop'>
        <span>Email</span> <span style={{ paddingRight: 1 }}>:</span>
      </div>
      <div className='card-des'>
        <span style={{ paddingLeft: 1 }}>supriyakumardas71@gmail.com </span>
      </div>
    </div>
    <div className='prop-value'>
      <div className='card-prop'>
        <span>Mobile</span> <span style={{ paddingRight: 1 }}>:</span>
      </div>
      <div className='card-des'>
        <span style={{ paddingLeft: 1 }}>+91</span><span> 8093291779</span>
      </div>
    </div>
  </div>
</Card>
    </div>
  )
}

export default UserProfile