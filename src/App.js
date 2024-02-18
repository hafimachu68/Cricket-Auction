import './App.css';
import Toastcontainer from './components/common/Toastcontainer';
import Addcourt from './pages/Addcourt';
import CourtUserViewPage from './pages/CourtUserViewPage';
import Home from './pages/Home';
import Login from './pages/Login';
import{BrowserRouter,Route,Routes}from'react-router-dom'
import { AdminAuth, LoginAuth, UserAuth } from './Authorization/authorization';
import MyGroupsPage from './components/common/myplayer';
import Addteam from './pages/Addteam';
import TeamUserViewPage from './pages/TeamUserViewPages';
import Teamsview from './pages/Teamsviews';
import TeamPage from './components/common/MYTEAMS';


function App() {
  return (
    <div className="App">

      <Toastcontainer/>

      <BrowserRouter>

      <Routes>
        {/* Login */}
        <Route element={<LoginAuth/>} >
        <Route path='/' element={<Login/>} />
        </Route>

        {/* userRoutes */}
        <Route element={<UserAuth/>}>
        <Route path='/home' element={<Home/>} />
        <Route path='/team' element={<Teamsview/>} />
        <Route path='/courtUserViewPage/:id' element={<CourtUserViewPage/>} />
        <Route path='/teamUserViewPage/:id' element={<TeamUserViewPage/>} />
        {/* <Route path='/my-players' element={<Myplayers/>} /> */}
        <Route exact path="/groups" element={<MyGroupsPage/>} />
        <Route exact path="/myteams" element={<TeamPage/>} />






        </Route>

         {/* adminroute */}
         <Route element={<AdminAuth/>}>
        <Route path='/addcourt' element={<Addcourt/>} />
        <Route path='/addteam' element={<Addteam/>} />

        </Route>




        </Routes>
        
      </BrowserRouter>
      
     
      
    </div>
  );
}

export default App;
