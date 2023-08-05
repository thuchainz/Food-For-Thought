import { IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Tab1: React.FC = () => {
  const [recentEat, setRecentEat] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState(0);
  const [name, setName] = useState("");

  const currentUser = useSelector((state: any) => state.user.currentUser);
  useEffect(() => {
    axios.get('https://cs125-proj-default-rtdb.firebaseio.com/users.json')
      .then(response => {
        setRecentEat(response.data[currentUser]["recentEat"]);
        setTotalCalories(response.data[currentUser]["calorieTotal"]);
        setCalorieGoal(response.data[currentUser]["calorieGoal"]);
        setName(response.data[currentUser]["name"]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle size='small'>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTitle class='app-title'>Food For Thought</IonTitle>
        <IonTitle class='greeting'>Hello, {name}!</IonTitle>

        <div className='container'>
          <IonCard class='home-card'>
            <IonCardHeader class='home-card-header'>Recently, you ate</IonCardHeader>
            <IonCardContent class='home-card-text'>{recentEat}</IonCardContent>
          </IonCard>
        </div>

        <div className='container'>
          <IonCard class='home-card'>
            <IonCardHeader class='home-card-header'>Your calorie intake today is</IonCardHeader>
            <IonRow>
              <IonText class='home-card-text-2'>{totalCalories}</IonText>
              <IonText class='home-card-text-3'>/ {calorieGoal}</IonText>
            </IonRow>
          </IonCard>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;