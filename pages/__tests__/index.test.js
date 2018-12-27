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
        title: 'test song 3',
        chords: 'B A Bm',
        id: 3
      }
    ]
  });

  console.log(wrapper.vm.getSongs.length);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('is showing all songs on load', () => {
    expect(wrapper.vm.getSongs.length === 3).toBeTruthy();
  });

  test('shows only the search for song', () => {
    wrapper.setData({
      search: '3'
    });

    console.log(wrapper.html());
    expect(wrapper.vm.getSongs.length === 1).toBeTruthy();
  });
});
