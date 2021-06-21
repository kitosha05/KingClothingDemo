import React, {useState} from 'react';
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar'
import Button from 'react-bootstrap/Button'
import {changeAvatarStart} from '../../redux/user/userActions'

const FileUpload=({changeAvatarStart, currentUser, setShowFileInput})=>{

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
        setShowFileInput(false)
	};
	

	return(
   <div>

			<input type="file" name="file"  onChange={changeHandler} />
			{isFilePicked ? (<div>
                <Avatar src={previewImage} />
                <Button variant='primary' onClick={handleSubmission}>Save Photo</Button>
            </div>
				
			) : (
				""
			)}
			<div>
				
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