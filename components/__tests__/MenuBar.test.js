import { shallowMount, createLocalVue } from '@vue/test-utils';
import MenuBar from '~/components/MenuBar';

describe('Create menu bar', () => {
  const wrapper = shallowMount(MenuBar, {
    stubs: ['nuxt-link']
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
