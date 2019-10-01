import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from './profile.model';
import { AddProfile, DeleteProfile, EditProfile, SearchProfile } from './profile.actions';

export class ProfileStateModel {
  profiles: Profile[];
  latestProfileID: number;
  searchText: string;
}

/**
 * default profile
 */
const defaultProfile: Profile = {
  id: 1, name: 'Default Profile'
};

/**
 * state pretty much hold everything
 *
 * @description
 * - Each state can only hold a certain `state model`.
 * - Each state is a collection of data relevant to each other having the same interface.
 * - This `state` holds a collection of data which in this case is a collection of profile.
 *
 * - we can define a `default` state value. or we can leave it as an empty array.
 */
@State<ProfileStateModel>({
  name: 'profiles',
  defaults: {
    // profiles: []
    profiles: [defaultProfile],
    latestProfileID: 0,
    searchText: ''
  }
})
export class ProfileState {
  constructor() {
  }

  @Selector()
  static getState(state: ProfileStateModel) {
    return state;
  }

  /**
   * `Profile List Selector`
   *
   * @returns the `profile list` from the state.
   */
  @Selector()
  static getProfileList(state: ProfileStateModel) {
    return state.profiles;
  }

  /**
   * `Search Profile Selector`
   *
   * @returns a list of profile according from the current `state.searchText` value.
   */
  @Selector()
  static searchProfile(state: ProfileStateModel) {
    if (state.searchText) {
      return state.profiles.filter(p => p.name.indexOf(state.searchText) !== -1 || p.id.toString() === state.searchText);
    }
    return [];
  }

  /**
   *  `@Action` is a decorator which decorate a method with `action information`.
   *  `AddProfile` is the `action information` imported from `profile.actions.ts`.
   */
  @Action(AddProfile)
  /**
   * `addProfile` is where you can handle your business logic.
   * this can be named to as anything, following a certain naming convention.
   */
  addProfile(
    /**
     * `State Context`, this is where we can access a certain state given its model.
     *
     * we can pick which method to use from the state instead of referencing the whole state.
     */
    { getState, patchState }: StateContext<ProfileStateModel>,
    /**
     * the `payload` which will be passed on from `this.store.dispatch(new AddProfile(newProfile))`
     */
    { profile }: AddProfile
  ) {
    /**
     * get current state of the `ProfileState`.
     */
    const state = getState();

    /**
     * do something with the state
     *
     * this is adding a new profile, which automatically increments the id to the highest profile id value from the list + 1.
     */
    let currId = 0;
    if (state.latestProfileID) {
      currId = state.latestProfileID + 1;
    } else {
      if (!state.profiles.length) {
        currId = 1;
      } else {
        currId = state.profiles[state.profiles.length - 1].id + 1;
      }
    }
    profile.id = currId;

    /**
     * patching profile state with the current `profileState` and the new one added.
     */
    patchState({
      profiles: [...state.profiles, profile],
      latestProfileID: currId
    });
  }

  /**
   * `Edit Profile`
   */
  @Action(EditProfile)
  editProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { profile }: EditProfile
  ) {
    const state = getState();
    const profileList = [...state.profiles];

    profileList.splice(profileList.findIndex(p => p.id === profile.id), 1, profile);
    patchState({
      profiles: profileList
    });
  }


  /**
   * `Search Profile Action`
   *
   * this will patch the `searchString` property of the `ProfileStateModel`.
   */
  @Action(SearchProfile)
  searchProfile(
    { patchState }: StateContext<ProfileStateModel>,
    { search }: SearchProfile
  ) {
    patchState({ searchText: search });
  }

  /**
   * `Delete Profile Action`
   *
   */
  @Action(DeleteProfile)
  deleteProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { id }: DeleteProfile
  ) {
    // console.log('ID to delete: ', id);
    const state = getState();

    const profileList = [...state.profiles];
    profileList.splice(profileList.findIndex(p => p.id === id), 1);

    patchState({
      profiles: profileList
    });
  }


}
