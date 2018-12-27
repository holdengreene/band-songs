import { shallowMount } from '@vue/test-utils';
import CreateSong from '~/pages/create-song/index';

describe('Create Song Page', () => {
  const wrapper = shallowMount(CreateSong);

  wrapper.setData({
    song: {
      // title: 'A new song',
      chords: 'Am Em G',
      description: 'The cool song'
    }
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  const songTitle = wrapper.find('.song-title');
  songTitle.setValue('A new song');
  test('it should set the input value', () => {
    expect(wrapper.vm.song.title).toEqual('A new song');
  });
});
