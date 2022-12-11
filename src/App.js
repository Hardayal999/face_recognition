import React, {Component} from 'react'
import './App.css';
import ParticlesBg from 'particles-bg'
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';




const initialState={
  input: "",
  imageURL:"",
  box:{},
  route: 'signIn',
  isSignedIn: false,
  user:{
    id:"",
    name:"",
    email:"",
    entries: 0,
    joined: ""
  }
}
class App extends Component{
  constructor(){
    super();
    this.state=initialState
  }

  loadUser=(data)=>{
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
      }
    }
    )
  }

  componentDidMount(){
    fetch("http://localhost:3000/")
      .then(response=>response.json())
      .then(console.log)
  }

  calculateFaceLocation=(data)=>{
   const clarifaiFace= data.outputs[0].data.regions[0].region_info.bounding_box;
   const image= document.getElementById("inputImage");
   const width= Number(image.width);
   const height= Number(image.height);
   return{
    leftCol: clarifaiFace.left_col*width,
    topRow: clarifaiFace.top_row*height,
    rightCol: width-(clarifaiFace.right_col*width),
    bottomRow: height-(clarifaiFace.bottom_row*height)
   }
  
  }

  displayFaceBox=(box)=>{
    console.log(box)
    this.setState({
      box:box
    })
  }

  onInputChange=(event)=>{
    this.setState({
      input:event.target.value
    })
  }

  onRouteChange=(route)=>{
    if(route==="signout"){
      this.setState(initialState)
    }else if(route==="home"){
    this.setState({isSignedIn:true})
    }
    this.setState({route: route})
  }

  onButtonSubmit=()=>{
    this.setState({
      imageURL:this.state.input
    })
    fetch("http://localhost:3000/imageurl",{
      method:"post",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
          input: this.state.input
      })
    })
       .then(response=>response.json())
       .then((response) => {
          if(response){
            fetch("http://localhost:3000/image",{
              method:"put",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify({
                  id: this.state.user.id
              })
          })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
          .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch((err) => console.log(err));
  }
  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
    return(
      <div className="App">
      <div>...</div>
        <ParticlesBg type="circle" bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route==="home"?
      <div>
         <Logo/>
         <Rank name={this.state.user.name} entries={this.state.user.entries}/>
         <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
         <FaceRecognition box={box} imageURL={imageURL}/>
       </div>
       :(
       route==="signIn"?
        <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
       )
      }
    </div>
    )
  }
}


export default App;
// export NODE_OPTIONS=--openssl-legacy-provider