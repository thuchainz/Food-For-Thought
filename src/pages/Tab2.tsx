import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { body } from 'ionicons/icons';
import { SetStateAction, useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { Stepcounter } from '@ionic-native/stepcounter';
import axios from 'axios';
import MealCard from '../components/MealCard';
import { useSelector } from 'react-redux';

const Tab2: React.FC = () => {
  interface Users {
    [key: string]: any;
  }

  interface Food {
    [key: string]: any;
  }

  const [stepCount, setStepCount] = useState<number>(3102);
  const [buttonText, setButtonText] = useState('Get User List');
  const [mealData, setMealData] = useState({});
  const [users, setUsers] = useState({} as Users)
  const [recommendedMeals, setRecommendedMeals] = useState<
  Array<{
      key: string,
  }>
>([])
const[numMeals, setNumMeals] = useState(1);
  
  let USERS_URL = "https://cs125-proj-default-rtdb.firebaseio.com/users"
  let FOODS_URL = "https://cs125-proj-default-rtdb.firebaseio.com/foods"
  
  const getUsers = async () => {
    axios.get(USERS_URL + '.json')
      .then(response => response.data)
      .then((data) => {
        // setButtonText(`User List (${Object.keys(data).length})`);
        setUsers(Object.assign({}, data))
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getMealData = async () => {
    axios.get(FOODS_URL + '.json')
      .then(response => response.data)
      .then(data => {
        setMealData(Object.assign({}, data));
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  useEffect(() => {
    // Check if Stepcounter plugin is available
    if (typeof Stepcounter === 'undefined') {
      console.log('Stepcounter plugin not available');
      return;
    }

    const startStepCounter = () => {
      Stepcounter.start(stepCount).then(onSuccess => setStepCount(stepCount), onFailure => console.log('stepcounter-start error', onFailure));
    };

    // Stop the step counter
    const stopStepCounter = () => {
      Stepcounter.stop();
    };

    startStepCounter();

    // Cleanup function
    return () => {
      stopStepCounter();
    };

  }, []);

  // TODO: CHANGE THIS
  const CURRENT_USER = useSelector((state: any) => state.user.currentUser);

  const users1: Users = users;

  const foods: Food = mealData;

  const getMeals = async () => {
    // Recomendation algo
    await getUsers();
    await getMealData();

    // based on user info and meal data, recommend 3 different meals
    // pick 3 best meals that fit their needs

    const filteredFoods = Object.values(foods).filter((food: { containsNuts: any; isVegan: any; calories: number; ethnic: any; }) => {

      // Filter out non-vegan foods if user is vegan
      if (users1[CURRENT_USER]["vegan"] && !food.isVegan) {
        return false;
      }
  
      // Filter out foods that exceed the user's calorie goal
      if (food.calories > users1[CURRENT_USER]["calorieGoal"] / numMeals) {
        return false;
      }
  
      // Filter out foods with different ethnicities
      if (food.ethnic.toLowerCase() !== users1[CURRENT_USER]["flavorProfile"].toLowerCase()) {
        return false;
      }
  
      return true;
    });

    // Sort the filtered foods by protein content
    const sortedFoods = filteredFoods.sort((a: { protein: number; }, b: { protein: number; }) => b.protein - a.protein);

    // Return the top 3 recommended meals
    let meals = sortedFoods.slice(0, 3)

  
    setRecommendedMeals(meals)
    console.log(recommendedMeals)

    return (recommendedMeals.map((meal: { [x: string]: any; }, index: any) => (
      <MealCard 
        key={index} 
        title={meal["title"]} 
        imageSrc={meal["imageSrc"]} 
        calories={meal["calories"]} 
        carbs={meal["carbs"]} 
        protein={meal["protein"]} 
        fat={meal["fat"]} 
        onClick={() => handleMealCardClick(meal["name"], meal["calories"])}
      />
    )))

  }

  const handleMealCardClick = (title: string, calories: number) => {  
    // Retrieve user's calorieTotal
    axios.get(`${USERS_URL}/${CURRENT_USER}.json`)
      .then((response) => {
        const userData = response.data;
        const calorieTotal = userData.calorieTotal || 0;
  
        // Update user's calorieTotal
        const updatedCalorieTotal = calorieTotal + calories;
        console.log(title, calories, calorieTotal, updatedCalorieTotal);
        axios.patch(`${USERS_URL}/${CURRENT_USER}.json`, {
          calorieTotal: updatedCalorieTotal
        }).then(() => {
          // Update user's recentEat
          axios.patch(`${USERS_URL}/${CURRENT_USER}.json`, {
            recentEat: title
          }).then(() => {
            console.log(`Successfully updated user's calorieTotal and recentEat`);
          }).catch((error) => {
            console.error(error);
          });
        }).catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size='small'>Meal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Meal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className='meal-num'>
          <IonRow>
            <IonLabel class='meal-num-text'>Today, I'm eating</IonLabel>
            <IonSelect interface='popover' placeholder='Select meals' onIonChange={(e) => setNumMeals(e.detail.value)}>
              <IonSelectOption value={1}>1 meal</IonSelectOption>
              <IonSelectOption value={2}>2 meals</IonSelectOption>
              <IonSelectOption value={3}>3 meals</IonSelectOption>
              <IonSelectOption value={4}>4 meals</IonSelectOption>
              <IonSelectOption value={5}>5 meals</IonSelectOption>
            </IonSelect>
          </IonRow>
        </div>

        <div className='meal-button'>
          <IonButton size='large' onClick={getMeals}>Build a Meal</IonButton>
        </div>
        
        <div className='recs'>
          {recommendedMeals.map((meal: { [x: string]: any; }, index: any) => (
            
            <MealCard 
              key={index} 
              title={meal["name"]} 
              imageSrc={meal["imageSrc"]} 
              calories={meal["calories"]} 
              carbs={meal["carb"]} 
              protein={meal["protein"]} 
              fat={meal["fat"]} 
              onClick={() => handleMealCardClick(meal["name"], meal["calories"])}
            />
          ))}
        </div>

  </IonContent>
</IonPage>
);
};

export default Tab2;
