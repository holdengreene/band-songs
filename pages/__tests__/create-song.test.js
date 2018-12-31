import { shallowMount } from '@vue/test-utils';
import CreateSong from '~/pages/create-song/index';
import mockAxios from 'jest-mock-axios';

describe('Create song page', () => {
  const wrapper = shallowMount(CreateSong, {
    stubs: ['nuxt-link']
  });

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

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

  test('a url input should be added', () => {
    wrapper.find('.add-url').trigger('click');
    expect(wrapper.findAll('.song-url').length).toEqual(1);
  });

  test('a url input should be removed', () => {
    wrapper.find('.remove-url').trigger('click');
    expect(wrapper.findAll('.song-url').length).toEqual(0);
  });

  test('multiple url inputs should be added', () => {
    for (let i = 0; i <= 3; i++) {
      wrapper.find('.add-url').trigger('click');
    }
    expect(wrapper.findAll('.song-url').length).toEqual(4);
  });

  test('the form should be submitted', () => {
    wrapper.find('.create-song').trigger('submit.prevent');
    expect(wrapper.find('.loading')).toBeTruthy();

    const expectedSong = {
      title: 'A new song',
      chords: ['Am', 'Em', 'G'],
      description: 'The cool song',
      uploadUrls: ['', '', '', '']
    };

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/bands/1/songs/create',
      expectedSong
    );

    mockAxios.mockResponse({
      data: {
        songCreated: {
          id: 1
        }
      }
    });

    expect(wrapper.find('.created')).toBeTruthy();
  });

  test('the form should be reset', () => {
    wrapper.find('.reset-form').trigger('click');
    expect(wrapper.vm.song.title).toEqual('');
  });
});
