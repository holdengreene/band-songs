import { shallowMount } from '@vue/test-utils';
import SongBanner from '~/components/SongBanner';

describe('Create song banner', () => {
  const wrapper = shallowMount(SongBanner);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
