import { shallowMount } from '@vue/test-utils';
import SongItem from '~/components/MenuBar';

describe('Create song item', () => {
  const wrapper = shallowMount(SongItem, {
    stubs: ['nuxt-link']
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
