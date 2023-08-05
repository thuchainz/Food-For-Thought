import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRouterLink,
  IonRouterOutlet,
  IonRow,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, fastFood, fastFoodOutline, home, homeOutline, person, personOutline, square, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store'
import { loginUser, updateUserList } from './actions';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useState } from 'react';
import axios from 'axios';

setupIonicReact();

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {

  const tabs = [
    {
      name: "Home",
      url: "/home",
      activeIcon: home,
      icon: homeOutline,
      component: Tab1
    },
    {
      name: "Search",
      url: "/search",
      activeIcon: fastFood,
      icon: fastFoodOutline,
      component: Tab2
    },
    {
      name: "Add",
      url: "/add",
      activeIcon: person,
      icon: personOutline,
      component: Tab3
    }
  ];

  const USERS_URL = "https://cs125-proj-default-rtdb.firebaseio.com/users"

  const [ activeTab, setActiveTab ] = useState(tabs[0].name);
  const [ defaultPage, setDefaultPage ] = useState('');
  const [ username, setUsername ] = useState('');
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const users = useSelector((state: any) => state.user.users);
  const dispatch = useDispatch()

  const onLogin = async () => {
    await axios.get(USERS_URL + '.json')
        .then(response => response.data)
        .then((data) => {
          if (data.hasOwnProperty(username)) {
            setDefaultPage('/home')
            dispatch(loginUser({username: username, userInfo: data[username]}))
          }
          else {
              setDefaultPage('/add')
              dispatch(loginUser({
                username: username,
                userInfo: {
                  age: '',
                  sex: '',
                  height: '',
                  weight: '',
                  calorieGoal: '',
                  carb: '',
                  protein: '',
                  fat: '',
                },
                })
              )
          }
          dispatch(updateUserList(Object.assign({}, data)))
        })
        .catch(error => {
          console.error(error);
        });
  }

  return (
    <IonApp>
      <IonReactRouter>
      {!isLoggedIn ? (
        <IonPage>
        {/* <IonHeader translucent={true}>
          <IonToolbar>
            <IonTitle size='small'>Login</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <IonContent fullscreen={true}>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Login</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonTitle class='app-title2'>Food For Thought</IonTitle>
          <IonTitle class='greeting2'>Welcome!</IonTitle>
          
          <div className='container2'>
          <IonItem>
            <IonLabel position="floating">Enter username</IonLabel>
            <IonInput value={username} onIonInput={(e: any) => {setUsername(e.target.value)}}></IonInput>
          </IonItem>
          </div>

          <div className='container'>
            <IonRow>
              <IonRouterLink routerLink={defaultPage}>
                <IonButton onClick={onLogin}>Login</IonButton>
              </IonRouterLink>
            </IonRow>
          </div>

        </IonContent>
      </IonPage>
      ) : (
          <IonTabs onIonTabsDidChange={ e => setActiveTab(e.detail.tab) }>
            <IonRouterOutlet>

              { tabs.map((tab, index) => {

                return (
                  <Route key={ index } exact path={ tab.url }>
                    <tab.component/>
                  </Route>
                );
              })}

              <Route exact path="/">
                <Redirect to={defaultPage} />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              { tabs.map((tab, barIndex) => {

                const active = tab.name === activeTab;

                return (
                  <IonTabButton key={ `tab_${ barIndex }` } tab={ tab.name } href={ tab.url }>
                    <IonIcon icon={ active ? tab.activeIcon : tab.icon } />
                  </IonTabButton>
                );
              })}
            </IonTabBar>
          </IonTabs>
      )}
      </IonReactRouter>
    </IonApp>
  )
}

export default AppWrapper;