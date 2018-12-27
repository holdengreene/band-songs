import { shallowMount } from '@vue/test-utils';
import Index from '~/pages/index';

describe('Index page', () => {
  const wrapper = shallowMount(Index);

  wrapper.setData({
    songsList: [
      {
        title: 'test song 1',
        chords: 'Am Bm C',
        id: 1
      },
      {
        title: 'test song 2',
        chords: 'Bm G C7',
        id: 2
      },
      {
        title: 'the test song 3',
        chords: 'B A Bm',
        id: 3
      }
    ]
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('is showing all songs on load', () => {
    expect(wrapper.findAll('songitem-stub').length).toEqual(3);
  });

  test('shows only the songs based on search', () => {
    wrapper.setData({
      search: 'The'
    });

    expect(wrapper.findAll('songitem-stub').length).toEqual(1);
  });
});
