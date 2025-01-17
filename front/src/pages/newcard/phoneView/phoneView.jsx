import React from 'react';
import './phoneView.css';
import Iphone14 from './../../../assets/14Iphone.png';
import  {useCard} from './../../../context/previewContext'

export default function PhoneView({  }) {

  const {data} = useCard()
  return (
    <div className="phoneView">
      
<div className="content">


      <h1>{data.title}</h1>
      <p>{data.bio}</p>

      <div className="linksContainer">
        {data.links && data.links.length > 0 ? (
          data.links.map((link, index) => (
            <div key={index} className="linkItem">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                
              >
                {link.title}
              </a>
            </div>
          ))
        ) : (
          <p>No links available</p>
        )}
      </div>
       
        
       
       </div>
      </div>
    
   
  );
}
