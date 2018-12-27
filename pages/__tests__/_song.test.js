import { shallowMount } from '@vue/test-utils';
import Song from '~/pages/_song';

describe('Song Page', () => {
  const wrapper = shallowMount(Song);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
