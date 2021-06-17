import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import gjsFirestore from 'grapesjs-firestore'
import firebase from '../../firebase/firebase.utils'
import {newPageStart, fetchPagesStart, savePageStart} from '../../redux/admin/adminActions'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import './Editor.scss'

const Editor =({newPageStart, pages, fetchPagesStart, savePageStart})=>{
    const projectId = 'clothingdemodb'
const [editor, setEditor] = useState(null);
const [newPageName, setNewPageName] = useState("");
const [selectedPage, setSelectedPage] = useState(null)
const [pageStyles, setPageStyles]= useState(null)
const [pageComponents, setPageComponents]= useState(null)
const [html, setHTML]= useState("")
const [css, setCss] = useState(null)
const [assets, setAssets]= useState(null)


useEffect(()=>{
    fetchPagesStart()
    clearCanvas()
    const editor = grapesjs.init({
        container:"#editor",
        plugins:[gjsPresetWebpage],
        pluginsOpts: {
            gjsPresetWebpage: {}
        }
        // fromElement: false,
        // components:pageComponents ? pageComponents[0] : null,
        // style:pageStyles,
        // storageManager:{
        //     autoload: false
        // }
    });
    setEditor(editor);
    
    
}, []);

const savePage = (e)=>{
    e.preventDefault();
    const html = localStorage.getItem('gjs-html')
    const css = localStorage.getItem('gjs-css')
    const styles = localStorage.getItem('gjs-styles')
    const components = localStorage.getItem('gjs-components')
    const assets = localStorage.getItem('gjs-assets')

    const page = {
        html,
        css,
        styles,
        components,
        assets,
        pageName: selectedPage
    }
    console.log(page)
    savePageStart(page)
   
}

const createNewPage = (e) =>{
    e.preventDefault();
    const page = {pageName:newPageName};
    newPageStart(page)
    fetchPagesStart()
}
const clearCanvas=()=>{
    localStorage.removeItem('gjs-html')
    localStorage.removeItem('gjs-css')
    localStorage.removeItem('gjs-components')
    localStorage.removeItem('gjs-styles')
    localStorage.removeItem('gjs-assets')
}
const onSelectPage=async(e)=>{
    const pageName= e.target.value
    const pageToEdit= pages.filter(p=>p.pageName ===pageName)[0]
   const html = (pageToEdit.html ===undefined) ? "" : pageToEdit.html
   const css = (pageToEdit.css ===undefined) ? "" : pageToEdit.css
   const assets = pageToEdit.assets 
   const styles = pageToEdit.styles 
   const components = pageToEdit.components 
  
    clearCanvas()
   localStorage.setItem('gjs-html', html)
   localStorage.setItem('gjs-css', css)
   localStorage.setItem('gjs-assets', assets)
   localStorage.setItem('gjs-styles', styles)
   localStorage.setItem('gjs-components', components)
   await setPageStyles(styles)
   await setPageComponents(components)
   await setSelectedPage(pageName)
   editor.load(res => console.log('Load callback'));
  

}
return(
    <div className='editor'>
        
        <Form>
        <Form.Group controlId="selectPage">
                    <Form.Label>Select An Existing Page To Edit</Form.Label>
                    <Form.Control as="select" name="selectedPage" onChange={(e)=>onSelectPage(e)} 
                          value={selectedPage}
                          required>
                              <option value="" selected disabled>Select Page To Edit</option>
                         {
                            !pages ? null : pages.map(page=>{
                             
                                return <option value={page.pageName}>{page.pageName}</option>
                            })
                        }    
                 </Form.Control>
                </Form.Group>
        </Form>

        <Form onSubmit={(e)=>{createNewPage(e)}}>
            <Form.Group>
                <Form.Label></Form.Label>
                <Form.Control type='text' name='newPageName' value={newPageName} onChange={(e)=>setNewPageName(e.target.value)}/>
                <Button type='submit'>Create New Page</Button>
            </Form.Group>
        </Form>
        <div>
            <button onClick={(e)=>savePage(e)}>Save Page</button>
        </div>
        <div id='editor'>

        </div>
    </div>
)


}
const mapDispatchToProps = dispatch=>({
    newPageStart: (page)=>dispatch(newPageStart(page)),
    fetchPagesStart: ()=>dispatch(fetchPagesStart()),
    savePageStart: (page)=>dispatch(savePageStart(page))
})
const mapStateToProps = state =>({
    pages: state.admin.pages
})
export default connect(mapStateToProps, mapDispatchToProps)(Editor)