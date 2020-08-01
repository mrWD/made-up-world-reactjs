import * as storiesConstants from '../constants/stories';
import * as storeHelper from '../helpers/storeHelper';

interface Story {
  storyURL: string;
  title: string;
  body: string;
  createdAt: Date;
  owner: {
    login: string;
  };
  options: string[];
  nextPages: string[];
  isFirst: boolean;
  isPublished?: boolean;
}

export interface StoriesState {
  storyList: Story[] | null;
  currentStory: Story | null;
  pageList: Story[] | null;
  pageNumber: number;
  pageCount: number;
}

const initialState = {
  currentStory: null,
  storyList: null,
  pageList: null,
  pageNumber: 1,
  pageCount: 0,
};

const handlers = {
  [storiesConstants.GET_PAGE_NUMBER]: storeHelper
    .changeState<StoriesState, typeof storiesConstants.GET_PAGE_NUMBER>('pageNumber'),

  [storiesConstants.GET_PAGE_COUNT]: storeHelper
    .changeState<StoriesState, typeof storiesConstants.GET_PAGE_COUNT>('pageCount'),

  [storiesConstants.GET_STORY_LIST]: storeHelper
    .changeState<StoriesState, typeof storiesConstants.GET_STORY_LIST>('storyList'),

  [storiesConstants.GET_STORY]: storeHelper
    .changeState<StoriesState, typeof storiesConstants.GET_STORY>('currentStory'),

  [storiesConstants.GET_ALL_PAGES]: storeHelper
    .changeState<StoriesState, typeof storiesConstants.GET_ALL_PAGES>('pageList'),
};

export const stories = storeHelper
  .reducerFactory<StoriesState, typeof handlers>(initialState, handlers);
