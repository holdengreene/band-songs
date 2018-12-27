import { shallowMount } from '@vue/test-utils';
import CreateSong from '~/pages/create-song/index';

describe('Create Song Page', () => {
  const wrapper = shallowMount(CreateSong);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
