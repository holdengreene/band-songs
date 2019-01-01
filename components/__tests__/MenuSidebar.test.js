import { shallowMount } from '@vue/test-utils';
import MenuSidebar from '~/components/MenuSidebar';

describe('Create song banner', () => {
  const wrapper = shallowMount(MenuSidebar, {
    stubs: ['nuxt-link']
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
