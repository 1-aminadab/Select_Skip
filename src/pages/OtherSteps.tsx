import React from 'react'
import TextAnimation from '../components/atom/TextAnimation'
import { useProvider } from '../context/AppContext';
import { steps } from '../data/steps';

export default function OtherSteps() {
    const { progress } = useProvider();
  return (
    <div style={{ display: 'flex', justifyContent: 'center',height: '100vh', width:'100vw' }}>
      <TextAnimation text={steps[progress].label}/>
    </div>
  )
}
