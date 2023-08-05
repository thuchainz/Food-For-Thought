import { IonAccordion, IonAccordionGroup, IonAvatar, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonCol, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRow, IonSelect, IonSelectOption, IonText, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import { body, caretDown, fitness, heart, heartDislike, pencil, checkmark } from 'ionicons/icons';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, updateUserInfo } from '../actions';
import axios from 'axios';
import './Tab3.css';

const Tab3: React.FC = () => {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const users = useSelector((state: any) => state.user.users);
  const [ readonly, setReadonly ] = useState(true);

  const [tempInfo, setTempInfo] = useState(userInfo)

  const dispatch = useDispatch()
  const USERS_URL = "https://cs125-proj-default-rtdb.firebaseio.com/users"

  const onEdit = () => {
    setReadonly(false)
  }
  const onSave = async () => {
    setReadonly(true)
    dispatch(addUser({currentUser: tempInfo}))
    dispatch(updateUserInfo(tempInfo))
    await axios.put(USERS_URL+"/"+currentUser+".json", 
      tempInfo)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  console.log(tempInfo)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size='small'>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size="large">Profile</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className='container'>
          <div className='first'>
            <IonCard class='profile-card'>
              <IonRow>
                <IonCol>
                  <div className='img-container'>
                    <IonAvatar class='profile-img'>
                      <img src="assets/anteater.png"/>
                    </IonAvatar>
                  </div>
                </IonCol>
                <IonCol>
                  <IonCardTitle class='name'>{currentUser}</IonCardTitle>
                </IonCol>
              </IonRow>
            </IonCard>
          </div>
        </div>

        <div className='container'>
          <IonCard class='profile-card'>
            <IonItem>
              <IonLabel>Use my physical activity</IonLabel>
              <IonToggle slot='end'></IonToggle>
            </IonItem>
          </IonCard>
        </div>

        <div className='container'>
          <IonCard class='profile-card'>
            <IonItem>
              <IonLabel>Use my weather</IonLabel>
              <IonToggle slot='end'></IonToggle>
            </IonItem>
          </IonCard>
        </div>
   
        <div className='accordion'>
          <IonAccordionGroup expand='inset'>
            <IonAccordion value='first'>
              <IonItem slot='header'>
                <IonRow>
                  <IonIcon class='body-icon' icon={body}/>
                  <IonCardSubtitle class='basic-info'>BASIC INFO</IonCardSubtitle>
                </IonRow>
              </IonItem>
              <div className='basic-info-content' slot='content'>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Age:</IonLabel>
                    <IonInput value={tempInfo["age"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'age': e.target.value}))}></IonInput>
                 </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Sex:</IonLabel>
                    <IonInput value={tempInfo["sex"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'sex': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Height:</IonLabel>
                    <IonInput value={tempInfo["height"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'height': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Weight:</IonLabel>
                    <IonInput value={tempInfo["weight"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'weight': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>

        <div className='accordion'>
          <IonAccordionGroup expand='inset'>
            <IonAccordion value='first'>
              <IonItem slot='header'>
                <IonRow>
                  <IonIcon class='body-icon' icon={fitness}/>
                  <IonCardSubtitle class='basic-info'>HEALTH GOALS</IonCardSubtitle>
                </IonRow>
              </IonItem>
              <div className='basic-info-content' slot='content'>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Calories:</IonLabel>
                    <IonInput value={tempInfo["calorieGoal"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'calorieGoal': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Carbs:</IonLabel>
                    <IonInput value={tempInfo["carbs"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'carbs': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Protein:</IonLabel>
                    <IonInput value={tempInfo["protein"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'protein': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
                <IonRow>
                  <IonItem class='basic-info-content' lines='none'>
                    <IonLabel class='label'>Fat:</IonLabel>
                    <IonInput value={tempInfo["fat"]} readonly={readonly} onIonInput={(e) => setTempInfo(Object.assign({}, tempInfo, { 'fat': e.target.value}))}></IonInput>
                  </IonItem>
                </IonRow>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>

        <div className='accordion'>
          <IonAccordionGroup expand='inset'>
            <IonAccordion value='first'>
              <IonItem slot='header'>
                <IonRow>
                  <IonIcon class='body-icon' icon={heart}/>
                  <IonCardSubtitle class='basic-info'>PREFERENCES</IonCardSubtitle>
                </IonRow>
              </IonItem>
              <div className='restrictions-content' slot='content'>
                <IonItem class='basic-info-content' lines='none'>
                  <IonLabel class='label'>Allergies:</IonLabel>
                </IonItem>
                <IonItem class='basic-info-content2' lines='none'>
                  <IonSelect placeholder="Select allergies" multiple={true} disabled={readonly}>
                    <IonSelectOption value="milk">Milk</IonSelectOption>
                    <IonSelectOption value="eggs">Eggs</IonSelectOption>
                    <IonSelectOption value="peanuts">Peanuts</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem class='basic-info-content' lines='none'>
                  <IonLabel class='label'>Special Diets:</IonLabel>
                </IonItem>
                <IonItem class='basic-info-content2' lines='none'>
                  <IonSelect placeholder="Select special diets" multiple={true} disabled={readonly}>
                    <IonSelectOption value="vegan">Vegan</IonSelectOption>
                    <IonSelectOption value="vegetarian">Vegetarian</IonSelectOption>
                    <IonSelectOption value="glutenfree">Gluten free</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonItem class='basic-info-content2' lines='none'>
                  <IonLabel class='label'>Cuisines:</IonLabel>
                </IonItem>
                <IonItem class='basic-info-content' lines='none'>
                  <IonSelect placeholder="Select cuisines" multiple={true} disabled={readonly}>
                    <IonSelectOption value="chinese">Chinese</IonSelectOption>
                    <IonSelectOption value="korean">Korean</IonSelectOption>
                    <IonSelectOption value="american">American</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </div>

        <IonFab slot='fixed' vertical='bottom' horizontal='end'>
          {readonly ? (
            <IonFabButton class='edit-button' onClick={onEdit}>
              <IonIcon class='edit-icon' icon={pencil}></IonIcon>
            </IonFabButton>
          ) : (
            <IonFabButton class='edit-button' onClick={onSave}>
              <IonIcon class='edit-icon' icon={checkmark}></IonIcon>
          </IonFabButton>
          )}
          
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
