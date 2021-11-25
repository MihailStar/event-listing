import React from 'react';

import { Card, CardProps } from '../card/card';
import './cards.scss';

export interface CardsProps {
  cards: CardProps[];
}

export class Cards extends React.Component<CardsProps> {
  public override render(): JSX.Element {
    if (this.props.cards.length === 0) {
      return (
        <div className="cards">
          <p className="cards__message">No events</p>
        </div>
      );
    }

    return (
      <ul className="cards">
        {this.props.cards.map((card) => {
          return (
            <li className="cards__card" key={card.id}>
              <Card {...card} />
            </li>
          );
        })}
      </ul>
    );
  }
}
