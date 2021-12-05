import React,{useRef, useEffect, useState} from 'react'

const Canvas = props => {
    
        
        const canvasRef = useRef(null)
        const [imgData,  setImgData] = useState('')

        const draw = (context,canvas) =>{
            const img = new Image()
            img.src=`${props.photo}`
            
            
            
            img.onload=()=>{
                context.filter = props.imageStyle
                context.drawImage(img, 0,0, canvas.width, canvas.height)
            }

            setImgData(canvas.toDataURL())

            console.log(props.image)
            
            
            
        }

        function handleDownload(){
            var tmpLink = document.createElement( 'a' );  
            tmpLink.download = 'image.png'; // set the name of the download file 
            tmpLink.href = imgData 
            
          
            // temporarily add link to body and initiate the download  
            document.body.appendChild( tmpLink );  
            tmpLink.click();  
            document.body.removeChild( tmpLink ); 
        }


        

        useEffect(() => {
            let canvas = canvasRef.current
            let context = canvas.getContext('2d')
           

            draw(context,canvas)

            
        }, [draw])

        return( 
            <>
                <canvas id="canvas" ref={canvasRef} {...props}/>
                <button className="sidebar-item" onClick={handleDownload}>Download NOw</button>
                <a href={imgData}></a>
            </>
        ) 
        
    
}

export default Canvas