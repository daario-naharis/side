import React,{Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import SolveProblem from './Components/SolveProblem/SolveProblem';
import {ContestData} from './Components/ContestData/ContestData';
import ContestListDisplayer from './Components/ContestListDisplayer/ContestListDisplayer';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import Problem from './Components/Problem/Problem';
import Result from './Components/Result/Result';
import Scroll from './Functions/Scroll';
import './App.css';
import HackerEarth from 'hackerearth-node';

const hackerEarth=new HackerEarth('','');


//ek problem ho rhi hai site me
//compile wala button click karne pe uske pichhle bar jo code 
//likha tha ide pe uska response dikha raha console pe aur result me
//par code submitted me sahi code dikha raha wo nahi lag kar raha
//iske liye ek tarika socha hai
//ek nayi button bana lenge ,onButtonShow usko compile karne ke baad 
//use karega user , to jab wo click hogi tabhi results show karenge 
//aur show karne se pahle hi code compile ho chuka hoga so naya result 
//hi aayega samne
//isko sahi karne ke liye onButtonCompile aur aur onButtonSubmit ko
//2 baar run kara denge for loop ka use karke usse ye sahi ho jayega


class App extends Component{

  constructor(){
    super();
    this.state = {
      config:{
        time_limit:1,
        memory_limit:323244,
        input:'',
        source:"prin 'Hello World'",
        language:'PYTHON'
      },
      code:"",
      testCases:"",
      progLang:"",
      submission:{},
      route:'signin',
      isSignedIn: false,
      compileRes:"",
      runRes:""
    }
  }
onCodeChange = (event) =>{
  // console.log(this.state.code);
   this.setState({code:event.target.value});
   // console.log(this.state.code);
}

onLanguageChange = (event) =>{
  this.setState({progLang:event.target.value});
}

onInputChange = (event) =>{
  this.setState({testCases:event.target.value});
}

onButtonSubmit = () =>{
  this.setState(prevState => {
      let config = Object.assign({}, prevState.config);  // creating copy of state variable jasper
      config.source = this.state.code;                     // update the name property, assign a new value                 
      return { config };                                 // return new object jasper object
    })
    this.setState(prevState => {
      let config = Object.assign({}, prevState.config);  // creating copy of state variable jasper
      config.language = this.state.progLang;                     // update the name property, assign a new value                 
      return { config };                                 // return new object jasper object
    })
    this.setState(prevState => {
      let config = Object.assign({}, prevState.config);  // creating copy of state variable jasper
      config.input = this.state.testCases;                     // update the name property, assign a new value                 
      return { config };                                 // return new object jasper object
    })
    hackerEarth.run(this.state.config)
                    .then(result => {
                      const runOutput = JSON.parse(result);
                      // console.log(runOutput);
                      // console.log(runOutput.run_status.output);
                      if(runOutput.compile_status!=="OK"){
                        this.setState({compileRes:"compilation error"}); 
                        this.setState({runRes:""});
                      }
                      else{
                        this.setState({compileRes:"compilation successful<h3>The output is:</h3>"});
                        this.setState({runRes:runOutput.run_status.output_html});
                      } 

                    })
                    .catch(err => {
                      if(this.state.progLang===""||this.state.progLang==="Select"){
                        this.setState({compileRes:"compilation error<br>please select a language"});
                        this.setState({runRes:""});
                      }
                      else{
                        this.setState({compileRes:"compilation error<br>please write some code"});
                        this.setState({runRes:""});
                      }
                        
                    });

}
onButtonCompile = () =>{
    this.setState(prevState => {
      let config = Object.assign({}, prevState.config);  // creating copy of state variable jasper
      config.source = this.state.code;                     // update the name property, assign a new value                 
      return { config };                                 // return new object jasper object
    })
    this.setState(prevState => {
      let config = Object.assign({}, prevState.config);  // creating copy of state variable jasper
      config.language = this.state.progLang;                     // update the name property, assign a new value                 
      return { config };                                 // return new object jasper object
    })
    this.setState(prevState => {
      let config = Object.assign({}, prevState.config);  // creating copy of state variable jasper
      config.input = this.state.testCases;                     // update the name property, assign a new value                 
      return { config };                                 // return new object jasper object
    })
  hackerEarth.compile(this.state.config)
                        .then((result) => {
                          const compilationOutput = JSON.parse(result);
                          this.setState({runRes:""});
                          if(compilationOutput.compile_status==="OK")
                              this.setState({compileRes:"compilation successful"});
                          else
                              this.setState({compileRes:"compilation error"});
                          // console.log(this.state.compileRes);
                        })
                        .catch(err => {
                          if(this.state.progLang===""||this.state.progLang==="Select"){
                              this.setState({compileRes:"compilation error<br>please select a language"});
                              this.setState({runRes:""});
                          }
                          else{
                              this.setState({compileRes:"compilation error<br>please write some code"});
                              this.setState({runRes:""});
                          }
                        });
}



onRouteChange = (route) =>{
  if(route === 'signin'){ 
    this.setState({isSignedIn:false})
  }
  else if(route === 'register'){
    this.setState({isSignedIn:false})
  }
  else{
    this.setState({isSignedIn:true})
  }
  this.setState({route: route});
}

  
  render(){
  return (
    <div className='App'>
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      {
        this.state.route === 'home'
        ?<div>
            <SolveProblem onRouteChange={this.onRouteChange}/>
            <div className='f2 light-red underline ma4'>
              Live Contests
            </div>
            <div>
              <Scroll>
                <ContestListDisplayer ContestData={ContestData}/>
              </Scroll>
            </div>
          </div>
        :(
          this.state.route === 'problem'
          ?<div>
            <Problem 
              onRouteChange={this.onRouteChange} 
              onCodeChange={this.onCodeChange}
              onLanguageChange={this.onLanguageChange} 
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} 
              onButtonCompile={this.onButtonCompile} 
            />
            <Result
              compileRes={this.state.compileRes}
              runRes={this.state.runRes}
              sourceCode={this.state.config.source}
              codeLanguage={this.state.config.language}
              inputCases={this.state.config.input}
            />
          </div>
          :(
            this.state.route === 'signin'
            ?<SignIn onRouteChange={this.onRouteChange}/>
            :<Register onRouteChange={this.onRouteChange}/>
            )
          )
      }
      {/*<Contest/>
      <Problem/>
      <SIgnIn/>
      <SignOut/>*/}
    </div>
  );
  }
}

export default App;
