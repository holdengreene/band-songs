import { shallowMount } from '@vue/test-utils';
import Song from '~/pages/_song';
import mockAxios from 'jest-mock-axios';

describe('Song page', () => {
  const wrapper = shallowMount(Song, {
    stubs: ['nuxt-link']
  });

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
      'http://api.ppandthekids.local/bands/1/songs/1/update',
      expectedSong
    );

    mockAxios.mockResponse({
      data: {
        songUpdated: [1]
      }
    });
  });

  test('the delete modal should open', () => {
    // Click the edit and delete button
    wrapper.find('.song-edit').trigger('click');
    wrapper.find('.song-delete').trigger('click');

    expect(wrapper.find('.song-modal-section.active').exists()).toBeTruthy();
  });

  test('the delete modal should be closed', () => {
    // Click the edit and delete button
    wrapper.find('.song-edit').trigger('click');
    wrapper.find('.song-delete').trigger('click');

    wrapper.find('.song-modal__cancel').trigger('click');

    expect(wrapper.find('.song-modal-section.active').exists()).toBeFalsy();
  });

  test('the song should be deleted', () => {
    // Click the edit and delete button
    wrapper.find('.song-edit').trigger('click');
    wrapper.find('.song-delete').trigger('click');

    wrapper.find('.song-modal__delete').trigger('click');

    expect(mockAxios.delete).toHaveBeenCalledWith(
      'http://api.ppandthekids.local/bands/1/songs/1/destroy'
    );

    mockAxios.mockResponse({
      data: {
        success: 1
      }
    });
  });
});
