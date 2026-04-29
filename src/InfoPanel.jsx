import { Link } from 'react-router-dom';
import './App.css'
import './InfoPanel.css'

function InfoPanel({data}) {

  return (
    <>
    <div id="infopanel">
        <h3>Pokemon Info</h3>
        <div class="left">
            <h4>{data[0].forms[0].name}</h4>
            <img src={data[0].sprites.front_default}/>
            {!data[0].sprites.front_default && <p>select a pokemon to view its info</p>}
        </div>
        <div class="right">
            <div>No:&nbsp;{(()=>{
                var x=data[0].id;
                return (x=="???" ? x : (x < 100 ? "0" : "")+(x < 10 ? "0" : "")+x)
                })()}</div>
            <div>TYPE:&nbsp;{data[0].types[0].type.name}</div>
            <div>HP:&nbsp;{/*data[0].stats.find(s => s.stat.name === "hp").base_stat*/}</div>
        </div>
      </div>
    </>
  )
}

export default InfoPanel
