import React, {useState, useEffect} from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import 'grapesjs-firestore'
import './Editor.scss'

const Editor =()=>{
const [editor, setEditor] = useState(null);
useEffect(()=>{
    const editor = grapesjs.init({
        container:"#editor",
        plugins:[gjsPresetWebpage],
        pluginsOpts: {
            gjsPresetWebpage:{}
        },
        storageManager: {
            type: 'remote',
            stepsBeforeSave: 3,
            urlStore: 'http://localhost:5000/page',
            urlLoad: 'http://endpoint/load-template/some-id-123'
            // For custom parameters/headers on requests
            
          }
    });
    setEditor(editor);
}, []);

return(
    <div className='editor'>
        <div id='editor'>

        </div>
    </div>
)


}
export default Editor