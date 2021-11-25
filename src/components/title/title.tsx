import React from 'react';

import './title.scss';

export interface TitleProps {
  title: string;
}

export class Title extends React.Component<TitleProps> {
  public override render(): JSX.Element {
    return <h1 className="title">{this.props.title}</h1>;
  }
}
