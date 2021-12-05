import React,{useState} from 'react'
import './App.css';
import Canvas from './components/Canvas';
import SlideBarItem from './components/SlideBarItem';
import Slider from './components/Slider';

const OPERATIONS = [
  {
    name:'Brightness',
    property:'brightness',
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Saturation',
    property:'saturate',
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Contrast',
    property:'contrast',
    value:100,
    range:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Grayscale',
    property:'grayscale',
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:'%'
  },
  {
    name:'Sepia   ',
    property:'sepia',
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:'%'
  },
  {
    name:'Invert',
    property:'invert',
    value:0,
    range:{
      min:0,
      max:100
    },
    unit:'%'
  },
  {
    name:'Hue',
    property:'hue-rotate',
    value:0,
    range:{
      min:0,
      max:360
    },
    unit:'deg'
  },
  {
    name:'Blur',
    property:'blur',
    value:0,
    range:{
      min:0,
      max:20
    },
    unit:'px'
  }
]



function App() {

function handleSliderchange({target}) {
  setOptions(prevOpt =>{
    return prevOpt.map((option, index)=>{
      if(index !== selectedOptionIndex) return option
      return { ...option, value: target.value}
    })
  })
}

  const [selectedOptionIndex,setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(OPERATIONS)
  

  const selectedOption = options[selectedOptionIndex]
  const [image, setImage] = useState(null)


  function getImageStyle(image) {
  const filters = options.map(option =>{
      return `${option.property}(${option.value}${option.unit})`
    })

    if(image == null)
    {
      const image = "https://images.unsplash.com/photo-1638541441135-8db5b7c166dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
      return {filter: filters.join(' '), backgroundImage:`url(${image})`}
    }
    return {filter: filters.join(' '), backgroundImage:`url(${image})`}
  }
  
  console.log(getImageStyle().filter)
  
  const imageHandle = (e) => {
    if(e.target.files && e.target.files[0]){
      setImage(URL.createObjectURL(e.target.files[0]))
    }
  }
 






  return (
    <div className="container">
       <div className="main-image" style={getImageStyle(image)} >
        Image
       
       </div>
       <div className="sidebar">
        {options.map((option,index)=>{
          return (<SlideBarItem
            key={index}
            name={option.name}
            active={index === selectedOptionIndex}
            handleClick={()=> setSelectedOptionIndex(index)}
          />)
        })}
          <input 
            type="file" 
            onChange={imageHandle}
            className='sidebar-item'
            />
          <button
            className='sidebar-item'
            
            
          >Download now</button>
       </div>

       <Canvas imageStyle={getImageStyle().filter} photo={image}/>

        
       <Slider
         min={selectedOption.range.min}
         max={selectedOption.range.max}
         value={selectedOption.value}
         handleChange={handleSliderchange}
       />
    </div>
  );
}

export default App;
