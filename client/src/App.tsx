import { Redirect, Route } from 'react-router-dom';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, homeOutline, searchOutline, personOutline } from 'ionicons/icons';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Location from './pages/GeoLocation';
import Profile from './pages/Profile';
import CategoryProducts from './pages/CategoryProducts';
import ProductPage from './pages/ProductPage';
import CardPage from './pages/CardPage';

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

import './global.css';


/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import '@ionic/react/css/palettes/dark.class.css';
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';
import VendorPage from './pages/VendorPage';
import SearchPage from './pages/SearchPage';
import CartPage from './pages/CartPage';

import { Preferences } from '@capacitor/preferences';
import { useUserStore } from "./data/UserStore";

setupIonicReact();

const session = localStorage.getItem('session')

const App: React.FC = () => (
  <IonApp className='max-w-screen-sm'>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/location">
            <Location />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route path="/category/:slug" exact>
            <CategoryProducts />
          </Route>
          <Route path="/category/:slug/:id" exact>
            <ProductPage/>
          </Route>
          <Route path="/vendors/:id" exact>
            <VendorPage />
          </Route>
          <Route path="/products/:id" exact>
            <ProductPage/>
          </Route>
          <Route path="/cart" exact>
            <CartPage/>
          </Route>
          <Route path="/card" exact>
            <CardPage/>
          </Route>
          <Route path="/search" exact>
            <SearchPage/>
          </Route>
          <Route
            exact
            path="/"
            render={() => {
              return session ? <Home /> : <Login />;
            }}
          />
          <Route
            exact
            path="/login"
            render={() => {
              return session ? <Home /> : <Login />;
            }}
          />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Inicio</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/search">
            <IonIcon aria-hidden="true" icon={searchOutline} />
            <IonLabel>Buscador</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/profile">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
