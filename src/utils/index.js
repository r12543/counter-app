// https://github.com/iliakan/detect-node
export const checkServer = () =>
  Object.prototype.toString.call(global.process) === `[object process]`;
