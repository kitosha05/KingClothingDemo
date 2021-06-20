import React, {useState} from 'react';
import {connect} from 'react-redux'
import Image from 'react-bootstrap/Image'
import {changeAvatarStart} from '../../redux/user/userActions'

const FileUpload=({changeAvatarStart, currentUser})=>{

	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [previewImage, setPreviewImage] = useState("")
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
	};

	const handleSubmission = () => {
        changeAvatarStart({selectedFile, currentUser})
	};
	

	return(
   <div>
			<input type="file" name="file" onChange={changeHandler} />
			{isFilePicked ? (
				<Image src={previewImage} rounded fluid/>
			) : (
				""
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
	)
}
const mapDispatchToProps = dispatch=>({
    changeAvatarStart: (file)=>dispatch(changeAvatarStart(file))
})
const mapStateToProps = state=>({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload)