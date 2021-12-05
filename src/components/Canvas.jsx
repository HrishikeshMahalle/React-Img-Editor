import React,{useRef, useEffect, useState} from 'react'

const Canvas = ({photo, imageStyle}) => {
        const canvasRef = useRef(null)
        const [imgData,  setImgData] = useState('')

        const draw = (context,canvas) => {
                const img = new Image()
                img.src=`${photo}`
    
                img.onload=()=>{
                    context.filter = imageStyle
                    context.drawImage(img, 0,0, canvas.width, canvas.height)
                }
    
                setImgData(canvas.toDataURL())
                
            }

        const styleBtn={
            border:'2px solid #7C1FFF',
            
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
            
            draw(context, canvas)
            
                        
        }, [imageStyle])

        return( 
            <>
            <div style={{textAlign:'center', paddingBottom:"10px", paddingTop:"0.5px"}} className="hideme">
                <h3 style={{paddingTop:'0.5px'}}>Download Preview</h3>
                <canvas height="180px" width="320px" id="canvas" ref={canvasRef} />
            </div>
            <button style={styleBtn} className="sidebar-item" onClick={handleDownload}>Download Now</button>
            
            
            </>
        ) 
        
    
}

export default Canvas