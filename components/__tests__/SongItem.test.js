import { shallowMount } from '@vue/test-utils';
import SongItem from '~/components/SongItem';

describe('Create song item', () => {
  const wrapper = shallowMount(SongItem, {
    stubs: ['nuxt-link']
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  wrapper.setProps({
    song: {
      title: 'A new hit song',
      chords: ['Am', 'Em7'],
      id: 1
    }
  });

  test('the title should be set', () => {
    expect(wrapper.html()).toContain('<h3>A new hit song</h3>');
  });

  test("the chords should be changed to a string", () => {
    expect(wrapper.html()).toContain('Am Em7');
  })
});
