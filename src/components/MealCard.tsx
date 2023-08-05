import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

function MealCard(props: any) {
  return (
    <div onClick={props.onClick}>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle className='results-title'>{props.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent className='results-item'>
          {props.calories} Calories | {props.carbs}g Carbs | {props.protein}g Protein | {props.fat}g Fat
        </IonCardContent>
      </IonCard>
    </div>
  );
}

export default MealCard;
