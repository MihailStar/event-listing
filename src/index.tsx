import ReactDOM from 'react-dom';
import React from 'react';

import { API } from './api/api';
import { App } from './components/app/app';
import './index.scss';

async function bootstrap() {
  try {
    const events = await API.getEvents();

    ReactDOM.render(
      <React.StrictMode>
        <App events={events} />
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
