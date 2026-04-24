import { Link } from 'react-router-dom';
import './App.css'

function Settings() {

    
  return (
    <>
    <div>
        <h2>Settings</h2>
        <fieldset>
            <h3>Font:</h3>
        <input type="radio" name="pixel"/> <label for="pixel">Pixel</label><br/>
        <input type="radio" name="sans"/> <label for="sans">Sans-Serif</label><br/>
        <input type="radio" name="serif"/> <label for="serif">Serif</label>
        </fieldset><br/>
        <input type="checkbox"/> <label>Disable animations</label>
    </div>
    </>
  )
}

export default Settings
