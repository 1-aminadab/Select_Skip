import React from 'react';
import GlassBackground from '../components/GlassBackground';
import SelectSkip from '../pages/SelectSkip';
import SummaryBar from '../components/SummaryBar';
import Steps from '../components/Steps';
import { useProvider } from '../context/AppContext';
import OtherSteps from './OtherSteps';
import styles from './styles/Home.module.css';


const Home: React.FC = () => {
    const { progress } = useProvider();
    return (
        <>
            <GlassBackground />
            <Steps />
            <div className={styles.stepsContainer}>
             {
             progress === 2 ?             
             <SelectSkip /> :
             <OtherSteps/>

            }    
            </div>
           
            <SummaryBar />
        </>

    );
};

export default Home;