import { shallow, createLocalVue } from 'vue-test-utils'
import Vuex from 'vuex'
import Modules from '../../../src/components/Modules'
import module from '../../../src/store/module'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Modules.vue', () => {
  let actions
  let state
  let store

  beforeEach(() => {
    state = {
      module: {
        clicks: 2
      }
    }

    actions = {
      moduleActionClick: jest.fn()
    }

    store = new Vuex.Store({
      modules: {
        module: {
          state,
          actions,
          getters: module.getters
        }
      }
    })
  })

  it('calls store action moduleActionClick when button is clicked', () => {
    const wrapper = shallow(Modules, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.moduleActionClick).toHaveBeenCalled()
  })

  it('Renders state.inputValue in first p tag', () => {
    const wrapper = shallow(Modules, { store, localVue })
    const p = wrapper.find('p')
    expect(p.text()).toBe(state.module.clicks.toString())
  })
})
