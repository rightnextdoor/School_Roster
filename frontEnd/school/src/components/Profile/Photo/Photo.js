import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import { Form, Button, Row, Col } from 'react-bootstrap';
import 'react-image-crop/dist/ReactCrop.css';
import Dropzone from 'react-dropzone';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from './ResuableUtils';

const imageMaxSize = 100000000000 // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item)=>{return item.trim()})

export class Photo extends Component {
    constructor(props) {
        super(props)
          this.imagePreviewCanvasRef = React.createRef();
          this.imageRef = React.createRef();
          this.fileInputRef = React.createRef()
          
        this.state = {
           photo: null,
           photoExt: null,
           crop: {
              width: 50,
              height: 90
           }
          
           
        }
        this.handleInputChange = this.handleInputChange.bind(this);
       }

       verifyFile = (files) => {
        if (files && files.length > 0){
            const currentFile = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if(currentFileSize > imageMaxSize){
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    handleOnDrop = (files, rejectedFiles) => {
        if (rejectedFiles && rejectedFiles.length > 0){
            this.verifyFile(rejectedFiles)
        }
        if (files && files.length > 0){
            const isVerified = this.verifyFile(files)
            if (isVerified){
                const currentFile = files[0]
                const reader = new FileReader()
                reader.addEventListener("load", ()=>{
                    const myResult = reader.result
                    this.setState({
                        photo: myResult,
                        photoExt: extractImageFileExtensionFromBase64(myResult)
                    })
                },false)
                reader.readAsDataURL(currentFile)
            }
        }
        
    }
    handleImageLoaded = (image) => {
        
    }

    handleOnCropComplete = (crop, pixelCrop) => {
        const canvasRef = this.imagePreviewCanvasRef.current;
        const imageRef = this.imageRef.current;
        const photo = this.state.photo;
        
        image64toCanvasRef(canvasRef, photo, crop, imageRef)
    }

    handleDownloadClick = (event) => {
        event.preventDefault()
        const photo = this.state.photo;
        if(photo){
            const canvasRef = this.imagePreviewCanvasRef.current;
            
            const {photoExt} = this.state
            const imageData64 = canvasRef.toDataURL('image/' + photoExt)
            
            const myFilename = "previewFile." + photoExt

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
            //console.log(myNewCroppedFile);
            // download file
            downloadBase64File(imageData64, myFilename)
            this.handleClearToDefault()
        }
        
    }

    handleClearToDefault = (event) =>{
        if (event) event.preventDefault()
        const canvas = this.imagePreviewCanvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        this.setState({
            photo: null,
         photoExt: null,
         crop: {
            width: 50,
            height: 90
         }
        })
        this.fileInputRef.current.value = null
    }

    handleFileSelect = event => {
        
        const files = event.target.files
        if (files && files.length > 0){
              const isVerified = this.verifyFile(files)
             if (isVerified){
                 // imageBase64Data 
                 const currentFile = files[0]
                 const myFileItemReader = new FileReader()
                 myFileItemReader.addEventListener("load", ()=>{
                     
                     const myResult = myFileItemReader.result
                     this.setState({
                         photo: myResult,
                         photoExt: extractImageFileExtensionFromBase64(myResult)
                     })
                 }, false)

                 myFileItemReader.readAsDataURL(currentFile)

             }
        }
    }

    handleOnCropChange = (crop) => {
        this.setState({crop: crop})
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        
        this.setState({
          [name]: value
        });
      }

  render() {
      const profile = this.props.profile;
    return (
      <div>
          <Form.Group as={Col} controlId="photo">
                <ReactCrop 
                        crop={this.state.crop}
                        onImageLoaded={this.handleImageLoaded}
                        onComplete={this.handleOnCropComplete} 
                        onChange={this.handleOnCropChange}
                        >
                         <img src={this.state.photo} ref={this.imageRef} /> 
                </ReactCrop>
                <p>Preview Canvas Crop</p>
                <canvas ref={this.imagePreviewCanvasRef}></canvas>
                        <Button onClick={this.handleDownloadClick}>Download</Button>
                        <Button onClick={this.handleClearToDefault}>Clear</Button>
                
                    
                    <Form.Label>Upload Photo:</Form.Label>
                        <Form.Control
                            type="file"
                            name="photo"
                            accept={acceptedFileTypes}
                            multiple={false}
                            defaultValue={profile.photo}
                            onChange={this.handleFileSelect}
                            /*disabled={this.state.disabledProfile}*/
                            
                        />
                        
                </Form.Group>
      </div>
    )
  }
}

export default Photo