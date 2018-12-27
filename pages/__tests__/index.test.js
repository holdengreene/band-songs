import { shallowMount } from '@vue/test-utils';
import Index from '~/pages/index';

describe('Index Page', () => {
  const wrapper = shallowMount(Index);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
