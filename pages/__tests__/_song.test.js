import { shallowMount } from '@vue/test-utils';
import Song from '~/pages/_song';
import mockAxios from 'jest-mock-axios';

describe('Song page', () => {
  const wrapper = shallowMount(Song);

  afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
  });

  wrapper.setData({
    song: {
      title: 'A test song',
      chords: 'Am Em G',
      description: 'This is a new cool song',
      uploadUrls: [
        {
          value: 'https://google.com'
        },
        {
          value: 'https://google.com/2/'
        }
      ],
      id: 1
    }
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("can't edit until the edit button has been clicked", () => {
    expect(wrapper.find('input:read-only')).toBeTruthy();
  });

  test('allow editing after edit button clicked', () => {
    wrapper.find('.song-edit').trigger('click');
    expect(wrapper.find('.editing').exists()).toBeTruthy();
  });

  test('the title should be updated', () => {
    const songTitle = wrapper.find('.song-title');
    songTitle.setValue('Here it is');
    expect(wrapper.vm.song.title).toEqual('Here it is');
  });

  test('the title should be reset', () => {
    wrapper.find('.cancel-song').trigger('click');
    expect(wrapper.vm.song.title).toEqual('A test song');
  });

  test('a url input should be added', () => {
    wrapper.find('.add-url').trigger('click');
    expect(wrapper.findAll('.song-url').length).toEqual(3);
  });

  test('a url input should be removed', () => {
    wrapper.find('.remove-url').trigger('click');
    expect(wrapper.findAll('.song-url').length).toEqual(2);
  });

  test('the song should update on submit', () => {
    wrapper.find('.update-form').trigger('submit.prevent');

    const expectedSong = {
      title: 'A test song',
      chords: ['Am', 'Em', 'G'],
      description: 'This is a new cool song',
      uploadUrls: ['https://google.com/2/']
    };

    expect(mockAxios.post).toHaveBeenCalledWith(
      'http://localhost:8080/bands/1/songs/1/update',
      expectedSong
    );

    mockAxios.mockResponse({
      data: {
        songUpdated: [1]
      }
    });
  });
});
