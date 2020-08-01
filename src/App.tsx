import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import './App.sass';

import { HeaderModule } from './modules/HeaderModule';
import { LoaderModule } from './modules/LoaderModule';
import { ErrorsModule } from './modules/ErrorsModule';

import { StoryListModule } from './modules/StoryListModule';
import { StoryModule } from './modules/StoryModule';
import { EditStoryModule } from './modules/EditStoryModule';
import { EditPageModule } from './modules/EditPageModule';
import { UserListModule } from './modules/UserListModule';
import { UserModule } from './modules/UserModule';

const App = () => (
  <BrowserRouter>
    <HeaderModule />

    <LoaderModule />

    <ErrorsModule />

    <main className="inner">
      <div className="inner__content">
        <Switch>
          <Route exact path="/" component={StoryListModule} />

          <Route path="/story/:id" component={StoryModule} />

          <Route path="/edit-story" component={EditStoryModule} />

          <Route path="/edit-page/:id?" component={EditPageModule} />

          <Route path="/user-list" component={UserListModule} />

          <Route path="/user/:id" component={UserModule} />
        </Switch>
      </div>
    </main>
  </BrowserRouter>
);

export default App;
