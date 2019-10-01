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
    profiles: [],
    // profiles: [defaultProfile],
    latestProfileID: 0,
    searchText: ''
  }
})
export class ProfileState {
  constructor() {
  }

  /**
   * `Current State Selector`
   *
   * @returns the `current state` of the `ProfileState`.
   */
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
    let currentId = 0;
    if (state.latestProfileID) {          // if latestProfileID is not falsy.
      currentId = state.latestProfileID + 1;
    } else {
      if (!state.profiles.length) {       // else check if list lenght is not falsy.
        currentId = 1;                    // if falsy set `currentId` to 1,
      } else {
        currentId = state.profiles.pop().id++;  // else set it to the id of the last profile from the list and incremented by 1.
      }
    }
    profile.id = currentId; // set profile id to `currentId`.

    /**
     * patching profile state with the current `profileState` and the new one added.
     * also patch the `latestProfileID` with the value of `currentId` for future reference.
     */
    patchState({
      profiles: [...state.profiles, profile],
      latestProfileID: currentId
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
   */
  @Action(DeleteProfile)
  deleteProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { id }: DeleteProfile
  ) {
    const state = getState();
    /**
     * we create a new instance of the `profiles` or the profile list of the state since we cannot modify it directly.
     */
    const profileList = [...state.profiles];
    profileList.splice(profileList.findIndex(p => p.id === id), 1);

    /**
     * then we patch it to the `profiles` property of the state to update it.
     */
    patchState({
      profiles: profileList
    });
  }


}
