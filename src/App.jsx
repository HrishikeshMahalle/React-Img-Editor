import React,{useState} from 'react'
import './App.css';
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
    value:100,
    range:{
      min:0,
      max:100
    },
    unit:'%'
  },
  {
    name:'Sepia',
    property:'sepia',
    value:100,
    range:{
      min:0,
      max:100
    },
    unit:'%'
  },
  {
    name:'Hue',
    property:'hue-rotate',
    value:100,
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


  function getImageStyle() {
    const filters = options.map(option =>{
      return `${option.property}(${option.value}${option.unit})`
    })

    return {filter: filters.join(' ')}

  }



  return (
    <div className="container">
       <div className="main-image" style={getImageStyle()}>
        Image
       
       </div>
       <div className="sidebar">
        {options.map((option,index)=>{
          return (<SlideBarItem
            key={index}
            name={option.name}
            active={index === selectedOption}
            handleClick={()=> setSelectedOptionIndex(index)}
          />)
        })}
       </div>
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
