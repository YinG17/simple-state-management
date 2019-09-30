import { Profile } from '../models/profile.model';


export class GetProfileList {
  static readonly type = '[Profile] List';
}

export class AddProfile {
  static readonly type = '[Profile] Add';
  constructor(public profile: Profile) {}
}

export class EditProfile {
  static readonly type = '[Profile] Edit';
  constructor(public profile: Profile) {}
}

export class DeleteProfile {
  static readonly type = '[Profile] Delete';
  constructor(public id: number) {}
}



