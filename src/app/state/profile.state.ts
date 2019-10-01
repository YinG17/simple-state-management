import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Profile } from './profile.model';

import { AddProfile, DeleteProfile, EditProfile } from './profile.actions';

export class ProfileStateModel {
  profiles: Profile[];
}

@State<ProfileStateModel>({
  name: 'profiles',
  defaults: {
    profiles: [
      { id: 1, name: 'Default Profile' }
    ]
  }
})
export class ProfileState {
  constructor() {
  }

  @Selector()
  static getProfileList(state: ProfileStateModel) {
    return state.profiles;
  }

  @Action(AddProfile) // `AddProfile` is a method imported from `profile.actions.ts`.
  addProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { profile }: AddProfile
  ) {
    const state = getState(); // get current `ProfileState`

    let currId = 0;
    if (!state.profiles.length) {
      currId = 1;
    } else {
      currId = state.profiles[state.profiles.length - 1].id + 1;
    }
    profile.id = currId;

    patchState({ // patching profile state with the current `profileState` and the new one added.
      profiles: [...state.profiles, profile]
    });
  }

  @Action(DeleteProfile) // `AddProfile` is a method imported from `profile.actions.ts`.
  deleteProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { id }
  ) {
    // console.log('ID to delete: ', id);

    const state = getState();
    patchState({
      profiles: state.profiles.filter(profile => profile.id !== id)
    });
  }

  @Action(EditProfile) // `AddProfile` is a method imported from `profile.actions.ts`.
  editProfile(
    { getState, patchState }: StateContext<ProfileStateModel>,
    { profile }
  ) {
    const state = getState();
    const profileList = [...state.profiles];
    
    profileList.splice(profileList.findIndex(p => p.id === profile.id), 1, profile);
    patchState({
      profiles: profileList
    });
  }
}
