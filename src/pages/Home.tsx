import React from 'react';
import GlassBackground from '../components/GlassBackground';
import SelectSkip from '../pages/SelectSkip';
import SummaryBar from '../components/SummaryBar';
import Steps from '../components/Steps';
import { useProvider } from '../context/AppContext';
import OtherSteps from './OtherSteps';

const Home: React.FC = () => {
    const { progress } = useProvider();
    return (
        <>
            <GlassBackground />
            <Steps />
            {
             progress === 2 ?             
             <SelectSkip /> :
             <OtherSteps/>

            }
            <SummaryBar />
        </>

    );
};

export default Home;