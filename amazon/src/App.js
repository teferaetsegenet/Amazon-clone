import { useEffect, useContext, } from 'react';
import './App.css';
import Routing from './Router';
import { Type } from './Utility/action.type';
import {auth } from "./Utility/firebase"
import {DataContext} from "./Component/DataProvider/DataProvider.jsx"




function App() {
const [{user}, dispatch] = useContext (DataContext)
useEffect (()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    // console.log(authUser);
    dispatch({
      type:Type.SET_USER,
      user:authUser
    })
  }else{
    dispatch({
      type:Type.SET_USER,
      user:null
    });
  }
});


},[user]);

  return (
    <div>
      <Routing />
    </div>
  );
}

export default App;
