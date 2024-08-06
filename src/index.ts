import { TailwindToNativeStyle } from './TailwindToNativeStyle';


export const native = new TailwindToNativeStyle();
(async () => {
  await native.init();
  // Example:
  native.generate('profile-profile.ts: flex flex-1 justify-center items-center');  
})();
