import React, {FC} from 'react';
import {Figure} from "../../models/figures/Figure";
import './LostFigures.css'

interface LostFiguresProps {
  title: string;
  figures: Figure[]
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
  return (
    <div className="lostFigures">
      <h3 className='lostFigures__subtitle'>{title}</h3>
      {figures.map(figure =>
        <div key={figure.id} className="lostFigures__container">
          {figure.name} {figure.logo && <img className='lostFigures__image' src={figure.logo}/>}
        </div>
      )}
    </div>
  );
};

export default LostFigures;
